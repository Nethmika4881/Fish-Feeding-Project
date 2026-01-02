// app/api/cron/check-feeds/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import mqtt from "mqtt";

export const maxDuration = 60;

export async function GET(request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  const { data: schedules } = await supabase
    .from("feeding_schedules")
    .select("*")
    .eq("is_enabled", true)
    .eq("today_status", "pending")
    .like("feed_time", `${currentTime}%`);

  if (!schedules || schedules.length === 0) {
    return NextResponse.json({ success: true, processed: 0 });
  }

  const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL);

  await new Promise((resolve) => {
    mqttClient.on("connect", resolve);
  });

  for (const schedule of schedules) {
    mqttClient.publish(
      `tank/${schedule.tank_id}/feed`,
      JSON.stringify({ amount: schedule.feed_amount }),
    );

    await supabase
      .from("feeding_schedules")
      .update({ today_status: "completed" })
      .eq("id", schedule.id);
  }

  mqttClient.end();

  return NextResponse.json({
    success: true,
    processed: schedules.length,
  });
}
