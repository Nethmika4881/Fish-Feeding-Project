"use server";

import { getMQTTService } from "./mqtt/mqttClient";
import { supabase } from "./supabase";

export const manualFeedingAction = async (formData) => {
  const tankID = Number(formData.get("tanks"));
  const amount = Number(formData.get("amount"));

  if (!tankID || !amount) return;
  const timeStamp = new Date().toISOString();

  const details = { tankID, amount, timeStamp };
  const topic = `user1/${tankID}/manual_feed`;

  const { data, error } = await supabase
    .from("manual_feedings")
    .insert([{ ...details, status: "pending" }])
    .select()
    .single();

  if (error) {
    throw new Error("Couldn't update database");
  }

  console.log(data, "recevied data");
  try {
    const mqtt = getMQTTService();
    mqtt.publish(topic, JSON.stringify(details));

    await supabase
      .from("manual_feedings")
      .update({ status: "done", timeStamp: new Date().toISOString() })
      .eq("id", data.id);
  } catch (e) {
    console.error("MQTT publish failed:", e);

    await supabase
      .from("manual_feedings")
      .update({ status: "failed", timeStamp: new Date().toISOString() })
      .eq("id", data.id);

    throw new Error("Failed to send feeding command");
  }

  return { success: true };
};
