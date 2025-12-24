import { getMQTTService } from "@/app/_lib/mqtt/mqttClient";
import { supabase } from "@/app/_lib/supabase";

export async function GET(req) {
  // named export
  const now = new Date().toISOString();

  // 1. Get due feeds
  const { data: dueFeeds, error } = await supabase
    .from("feeding_schedules")
    .select("*")
    .eq("is_enabled", true)
    .lte("feed_time", now);

  if (error) {
    console.error("Supabase error:", error);
    return new Response("DB error", { status: 500 });
  }

  if (!dueFeeds?.length) return new Response("No feeds due", { status: 200 });

  for (const feed of dueFeeds) {
    try {
      // MQTT
      const mqtt = getMQTTService();
      await mqtt.connect();
      await mqtt.publish(
        `user1/${feed.tank_id}/manual_feed`,
        JSON.stringify({
          tank_id: feed.tank_id,
          feed_name: feed.feed_name,
          feed_amount: feed.feed_amount,
          requested_at: now,
        }),
      );

      // Subtract inventory
      await supabase.rpc("subtract_feed_inventory", {
        p_inventory_id: feed.inventory_id,
        p_shop_id: feed.shop_id,
        p_amount_kg: feed.feed_amount,
      });

      // Mark executed
      await supabase
        .from("scheduled_feeds")
        .update({ is_enabled: false, status: "completed" })
        .eq("id", feed.id);
    } catch (err) {
      console.error("Failed for feed:", feed.id, err);
      // Optionally log to cron_logs
    }
  }

  return new Response("Scheduled feeds processed", { status: 200 });
}
