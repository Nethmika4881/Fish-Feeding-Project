import { getMQTTService } from "@/app/_lib/mqtt/mqttClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mqttService = getMQTTService();
    const isConnected = mqttService.getConnectionStatus();

    return NextResponse.json({
      success: true,
      connected: isConnected,
      timestamp: new Date().toISOString(),
      broker:
        process.env.MQTT_BROKER_URL ||
        "mqtts://s1f1221f.ala.asia-southeast1.emqxsl.com:8883",
    });
  } catch (error) {
    console.error("Error checking MQTT status:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to get MQTT status",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST → manually reconnect MQTT
export async function POST() {
  try {
    const mqttService = getMQTTService();
    mqttService.reconnect();

    return NextResponse.json({
      success: true,
      message: "MQTT reconnection initiated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error reconnecting MQTT:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to reconnect MQTT",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
