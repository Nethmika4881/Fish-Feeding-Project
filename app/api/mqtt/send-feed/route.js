// app/api/mqtt/send-feed/route.js
import { NextResponse } from "next/server";
import mqtt from "mqtt";

export async function POST(request) {
  try {
    const { scheduleId, tankId, feedAmount } = await request.json();

    console.log(
      `[MQTT] Sending feed command to tank ${tankId}: ${feedAmount}g`,
    );

    // Connect to MQTT broker
    const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });

    // Wait for connection
    await new Promise((resolve, reject) => {
      mqttClient.on("connect", resolve);
      mqttClient.on("error", reject);
      setTimeout(() => reject(new Error("MQTT timeout")), 10000);
    });

    // Publish feed command
    await new Promise((resolve, reject) => {
      mqttClient.publish(
        `tank/${tankId}/feed`,
        JSON.stringify({
          amount: feedAmount,
          timestamp: new Date().toISOString(),
          scheduleId,
        }),
        { qos: 1 },
        (err) => (err ? reject(err) : resolve()),
      );
    });

    mqttClient.end();

    console.log("[MQTT] ✅ Feed command sent successfully");

    return NextResponse.json({
      success: true,
      tankId,
      feedAmount,
    });
  } catch (error) {
    console.error("[MQTT] ❌ Error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
