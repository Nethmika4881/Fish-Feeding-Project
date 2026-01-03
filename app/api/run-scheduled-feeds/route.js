// app/api/mqtt/send-feed/route.js
import { getMQTTService } from "./../../_lib/mqtt/mqttClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { scheduleId, tankId, feedAmount } = await request.json();

    const mqttService = getMQTTService();

    await mqttService.connect();

    await mqttService.publish(
      `tank/${tankId}/feed`,
      JSON.stringify({
        amount: feedAmount,
        timestamp: new Date().toISOString(),
        scheduleId,
      }),
      { qos: 1 },
    );

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
