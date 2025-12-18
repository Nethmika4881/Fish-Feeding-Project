import { getMQTTService } from "@/app/_lib/mqtt/mqttClient";
import { NextResponse } from "next/server";

// Store latest sensor data in memory
let latestSensorData = null;

// Initialize MQTT service
const mqttService = getMQTTService();

// Register MQTT message handler (runs once per server instance)
mqttService.onMessage((topic, message) => {
  if (topic === "nodemcu/sensor") {
    try {
      latestSensorData = JSON.parse(message.toString());

      if (latestSensorData) {
        latestSensorData.timestamp = new Date().toISOString();
        latestSensorData.topic = topic;
      }

      console.log("✓ Updated sensor data:", latestSensorData);
    } catch (error) {
      console.error("✗ Error parsing sensor data:", error);
    }
  }
});

// GET → retrieve latest sensor data
export async function GET() {
  try {
    const isConnected = mqttService.getConnectionStatus();

    if (!latestSensorData) {
      return NextResponse.json(
        {
          success: false,
          error: "No sensor data available yet",
          connected: isConnected,
          message: isConnected
            ? "Connected but waiting for sensor data"
            : "MQTT not connected",
          timestamp: new Date().toISOString(),
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: latestSensorData,
      connected: isConnected,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error retrieving sensor data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve sensor data",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}

// POST → publish or subscribe
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, topic, message } = body;

    if (!mqttService.getConnectionStatus()) {
      return NextResponse.json(
        {
          success: false,
          error: "MQTT service not connected",
        },
        { status: 503 },
      );
    }

    if (action === "publish") {
      if (!topic || !message) {
        return NextResponse.json(
          {
            success: false,
            error: "Topic and message are required for publish action",
          },
          { status: 400 },
        );
      }

      mqttService.publish(topic, JSON.stringify(message));

      return NextResponse.json({
        success: true,
        message: `Published to ${topic}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === "subscribe") {
      if (!topic) {
        return NextResponse.json(
          {
            success: false,
            error: "Topic is required for subscribe action",
          },
          { status: 400 },
        );
      }

      mqttService.subscribe(topic);

      return NextResponse.json({
        success: true,
        message: `Subscribed to ${topic}`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action. Use 'publish' or 'subscribe'",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error in sensor POST endpoint:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        details: error?.message || "Unknown error",
      },
      { status: 500 },
    );
  }
}

// DELETE → clear cached sensor data
export async function DELETE() {
  try {
    latestSensorData = null;

    return NextResponse.json({
      success: true,
      message: "Sensor data cache cleared",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error clearing sensor data:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear sensor data",
      },
      { status: 500 },
    );
  }
}
