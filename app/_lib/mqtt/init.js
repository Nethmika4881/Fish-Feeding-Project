// lib/mqtt/init.js

import { getMQTTService } from "./mqttClient";

export async function initializeMQTT() {
  const mqttService = getMQTTService();
  try {
    await mqttService.connect();
    console.log("MQTT service initialized successfully");
  } catch (error) {
    console.error("Failed to initialize MQTT service:", error);
  }
}
