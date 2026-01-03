// app/api/mqtt/send-feed/route.js
import { NextResponse } from "next/server";
import { getMQTTService } from "@/app/_lib/mqtt/mqttService";

export async function POST(request) {
  try {
    const { scheduleId, tankId, feedAmount } = await request.json();

    const mqttService = getMQTTService();

    // Connection should already be established from layout.jsx
    // But we call connect() anyway as it returns immediately if already connected
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
