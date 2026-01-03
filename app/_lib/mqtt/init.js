import { getMQTTService } from "./mqttClient";

let initializationPromise = null;
let isInitialized = false;

/**
 * Initialize MQTT connection
 * This function ensures the connection is only initialized once
 */
export async function initializeMQTT() {
  // If already initialized, return immediately
  if (isInitialized) {
    console.log("✓ MQTT already initialized");
    return true;
  }

  // If initialization is in progress, wait for it
  if (initializationPromise) {
    console.log("⏳ MQTT initialization in progress...");
    return initializationPromise;
  }

  // Start initialization
  initializationPromise = (async () => {
    try {
      console.log("🚀 Initializing MQTT connection...");
      const mqttService = await getMQTTService();

      // Connect to MQTT broker
      await mqttService.connect();

      isInitialized = true;
      console.log("✅ MQTT initialization complete");
      return true;
    } catch (error) {
      console.error("❌ MQTT initialization failed:", error);
      initializationPromise = null;
      throw error;
    }
  })();

  return initializationPromise;
}
