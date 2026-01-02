"use server";

import { revalidatePath } from "next/cache";
import { getInventoryDetails } from "../_services/supabaseActions";
import { getMQTTService } from "./mqtt/mqttClient";
import { supabase } from "./supabase";

export const manualFeedingAction = async (formData) => {
  try {
    // Extract and validate form data
    const tankID = formData.get("tank");
    const food_name = formData.get("foodType");
    const feed_amount = Number(formData.get("amount"));

    if (!tankID || !food_name) {
      return { error: "Please select both tank and food type." };
    }
    if (!feed_amount || feed_amount <= 0 || isNaN(feed_amount)) {
      return { error: "Please enter a valid amount greater than 0." };
    }

    const timeStamp = new Date().toISOString();
    const shopId = "4e7ab86b-37b2-40e8-a789-01f675d6df3b"; // can be moved to ENV

    // Step 1: Insert manual feeding request
    const { data: feedingRequest, error: insertError } = await supabase
      .from("manual_feeding_requests")
      .insert({
        shop_id: shopId,
        tank_id: tankID,
        feed_name: food_name,
        feed_amount,
        status: "pending",
        updated_at: timeStamp,
      })
      .select()
      .single();

    if (insertError || !feedingRequest) {
      console.error("Database insert error:", insertError);
      return { error: "Failed to create feeding request." };
    }

    console.log("Feeding request created:", feedingRequest.id);

    // Step 2: Subtract feed inventory using RPC
    const res = await getInventoryDetails();
    const inventoryItem = res.find((x) => x.feed_name === food_name);
    console.log(inventoryItem, "item");
    if (!inventoryItem) {
      return { error: "Feed not found in inventory." };
    }

    const inventoryID = inventoryItem.id;

    console.log(inventoryID, shopId, feed_amount, "whoooooooooooooo");
    const { data: inventoryUpdated, error: inventoryError } =
      await supabase.rpc("subtract_feed_inventory", {
        p_inventory_id: inventoryID,
        p_shop_id: shopId,
        p_amount_kg: feed_amount,
      });

    console.log(inventoryUpdated, inventoryError, feed_amount, "do or die");
    if (inventoryError) {
      console.error("Inventory update failed:", inventoryError);
      return { error: "Failed to update feed inventory." };
    }

    if (!inventoryUpdated) {
      return { error: "Insufficient feed inventory." };
    }

    // Step 4: Setup MQTT acknowledgment subscription and publish
    const topic = `user1/${tankID}/manual_feed`;
    const ackTopic = `user1/${tankID}/manual_feed_ack`;
    const payload = {
      tank_id: tankID,
      feed_amount,
      requestID: feedingRequest.id,
    };

    let mqttSuccess = false;

    try {
      const mqtt = getMQTTService();
      await mqtt.connect();

      mqtt.onMessage(ackTopic, async (message) => {
        try {
          const ackData = JSON.parse(message);
          console.log("Received ACK:", ackData);

          if (
            ackData.status === "success" &&
            ackData.requestID === feedingRequest.id
          ) {
            // Step 3: Insert feed log
            const { data: f, error: logError } = await supabase
              .from("feed_logs")
              .insert({
                shop_id: shopId,
                tankId: tankID,
                type: "manual",
                manual_feed_id: feedingRequest.id,
              })
              .select();

            console.log(f, "final data ");
            if (logError) {
              console.error("Feed log insert error:", logError);
            }
            const { error: completeError } = await supabase
              .from("manual_feeding_requests")
              .update({
                status: "completed",
                updated_at: new Date().toISOString(),
              })
              .eq("id", feedingRequest.id);

            if (completeError) {
              console.error(
                "Failed to update status to completed:",
                completeError,
              );
            } else {
              console.log(
                "Feeding request marked as completed:",
                feedingRequest.id,
              );
              revalidatePath("/manual-feeding");
              revalidatePath("/feed-logs");
              revalidatePath("/dashboard");
            }
          }
        } catch (err) {
          console.error("Error processing ACK message:", err);
        }
      });

      // Subscribe to acknowledgment topic
      mqtt.subscribe(ackTopic);

      // Publish feeding command
      await mqtt.publish(topic, JSON.stringify(payload));
      console.log(JSON.stringify(payload), "payload");
      console.log("MQTT published successfully to:", topic);
      mqttSuccess = true;
    } catch (err) {
      console.error("MQTT publish failed:", err);
    }

    // Step 5: Update feeding request status to "sent"
    const finalStatus = mqttSuccess ? "sent" : "failed";
    const { error: updateError } = await supabase
      .from("manual_feeding_requests")
      .update({ status: finalStatus, updated_at: new Date().toISOString() })
      .eq("id", feedingRequest.id);

    if (updateError) {
      console.error("Status update error:", updateError);
    }

    // Step 6: Revalidate paths
    revalidatePath("/manual-feeding");
    revalidatePath("/feed-logs");
    revalidatePath("/dashboard");

    return mqttSuccess
      ? {
          success: true,
          message:
            "Feeding command sent successfully. Waiting for device acknowledgment.",
          requestId: feedingRequest.id,
        }
      : {
          error:
            "Failed to send command to device. The request has been logged.",
          requestId: feedingRequest.id,
          partialSuccess: true,
        };
  } catch (error) {
    console.error("Unexpected error in manualFeedingAction:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    };
  }
};
