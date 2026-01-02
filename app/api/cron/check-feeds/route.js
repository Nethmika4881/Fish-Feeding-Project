// app/api/cron/check-feeds/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import mqtt from "mqtt";

export const maxDuration = 60; // Allow up to 60 seconds execution time

export async function GET(request) {
  // Security: Verify the request is from Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  try {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

    console.log(`[CRON] Checking feeds for time: ${currentTime}`);

    // Find all pending schedules for this minute
    const { data: schedules, error } = await supabase
      .from("feeding_schedules")
      .select(
        `
        id,
        tank_id,
        feed_amount,
        feed_time,
        shop_id,
        tanks (
          tank_name
        )
      `,
      )
      .eq("is_enabled", true)
      .eq("today_status", "pending")
      .like("feed_time", `${currentTime}%`);

    if (error) {
      console.error("[CRON] Database error:", error);
      throw error;
    }

    if (!schedules || schedules.length === 0) {
      console.log("[CRON] No pending feeds at this time");
      return NextResponse.json({
        success: true,
        processed: 0,
        message: "No schedules to process",
      });
    }

    console.log(`[CRON] Found ${schedules.length} schedule(s)`);

    // Connect to MQTT broker
    const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });

    // Wait for MQTT connection
    await new Promise((resolve, reject) => {
      mqttClient.on("connect", resolve);
      mqttClient.on("error", reject);
      setTimeout(() => reject(new Error("MQTT connection timeout")), 10000);
    });

    console.log("[CRON] MQTT connected");

    const results = [];

    for (const schedule of schedules) {
      try {
        const topic = `tank/${schedule.tank_id}/feed`;
        const message = JSON.stringify({
          amount: schedule.feed_amount,
          timestamp: now.toISOString(),
          scheduleId: schedule.id,
          tankName: schedule.tanks?.tank_name,
        });

        // Publish MQTT message
        await new Promise((resolve, reject) => {
          mqttClient.publish(topic, message, { qos: 1 }, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });

        console.log(
          `[CRON] ✅ Published to ${topic}: ${schedule.feed_amount}g`,
        );

        // Update feeding schedule
        const { error: updateError } = await supabase
          .from("feeding_schedules")
          .update({
            today_status: "completed",
            updated_at: now.toISOString(),
          })
          .eq("id", schedule.id);

        if (updateError) throw updateError;

        // Insert feed log
        const { error: logError } = await supabase.from("feed_logs").insert({
          schedule_id: schedule.id,
          tank_id: schedule.tank_id,
          feed_amount: schedule.feed_amount,
          shop_id: schedule.shop_id,
          created_at: now.toISOString(),
        });

        if (logError) throw logError;

        results.push({
          scheduleId: schedule.id,
          tankId: schedule.tank_id,
          status: "success",
        });
      } catch (err) {
        console.error(
          `[CRON] ❌ Error processing schedule ${schedule.id}:`,
          err,
        );

        results.push({
          scheduleId: schedule.id,
          status: "error",
          error: err.message || "Unknown error",
        });
      }
    }

    mqttClient.end();

    console.log(`[CRON] Completed. Processed: ${results.length}`);

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[CRON] Fatal error:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
