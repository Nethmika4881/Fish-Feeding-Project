import { getMQTTService } from "@/app/_lib/mqtt/mqttClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { details, topic } = body;

    // Validate command
    if (!topic) {
      return NextResponse.json(
        { error: "Command is required" },
        { status: 400 },
      );
    }

    // Get MQTT service instance
    const mqttService = getMQTTService();

    // Check connection
    if (!mqttService.getConnectionStatus()) {
      return NextResponse.json(
        { error: "MQTT service not connected" },
        { status: 503 },
      );
    }

    // Default topic
    const publishTopic = topic;

    console.log(publishTopic, details, "got the topics");
    // Publish command
    mqttService.publish(publishTopic, details);

    return NextResponse.json({
      success: true,
      message: `Command "${command}" sent successfully to ${publishTopic}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error sending command:", error);

    return NextResponse.json(
      {
        error: "Failed to send command",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}
