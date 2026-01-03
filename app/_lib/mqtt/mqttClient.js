import mqtt from "mqtt";

let client = null;
let isConnected = false;
let isConnecting = false;
let connectionPromise = null;
const pendingSubscriptions = new Set();
const messageHandlers = new Map();

function connect() {
  // If already connected, resolve immediately
  if (client && isConnected) {
    console.log("✓ MQTT already connected - reusing connection");
    return Promise.resolve();
  }

  // If currently connecting, return the existing promise
  if (connectionPromise) {
    console.log("⏳ Connection in progress - waiting...");
    return connectionPromise;
  }

  isConnecting = true;

  connectionPromise = new Promise((resolve, reject) => {
    const brokerUrl = process.env.MQTT_BROKER_URL;
    const username = process.env.MQTT_USERNAME;
    const password = process.env.MQTT_PASSWORD;

    // Debug: Log what we're getting
    console.log("🔍 Debug - Environment Variables:");
    console.log(
      "  NEXT_PUBLIC_MQTT_BROKER_URL:",
      process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
    );
    console.log("  MQTT_BROKER_URL:", process.env.MQTT_BROKER_URL);
    console.log("  Final brokerUrl:", brokerUrl);

    // Validate environment variables
    if (!brokerUrl) {
      const error = new Error(
        "❌ MQTT_BROKER_URL is not defined in environment variables. Please check your .env.local file",
      );
      console.error(error.message);
      isConnecting = false;
      connectionPromise = null;
      reject(error);
      return;
    }

    // Validate URL format
    if (
      !brokerUrl.startsWith("mqtt://") &&
      !brokerUrl.startsWith("mqtts://") &&
      !brokerUrl.startsWith("ws://") &&
      !brokerUrl.startsWith("wss://")
    ) {
      const error = new Error(
        `❌ Invalid MQTT URL format: ${brokerUrl}. Must start with mqtt://, mqtts://, ws://, or wss://`,
      );
      console.error(error.message);
      isConnecting = false;
      connectionPromise = null;
      reject(error);
      return;
    }

    const options = {
      clientId: `nextjs_webapp_client`,
      username: username,
      password: password,
      clean: true, // Changed to true to prevent session buildup
      keepalive: 60,
      reconnectPeriod: 5000,
      connectTimeout: 30 * 1000,
      rejectUnauthorized: false,
      will: {
        topic: "client/status",
        payload: "offline",
        qos: 1,
        retain: true,
      },
    };

    console.log("🔌 Connecting to MQTT broker:", brokerUrl);
    console.log("👤 Username:", username ? "✓ Set" : "✗ Not set");
    console.log("🔑 Password:", password ? "✓ Set" : "✗ Not set");

    client = mqtt.connect(brokerUrl, options);

    const timeout = setTimeout(() => {
      isConnecting = false;
      connectionPromise = null;
      const error = new Error("MQTT connection timeout after 30 seconds");
      console.error("❌", error.message);
      reject(error);
    }, 30000);

    client.on("connect", () => {
      clearTimeout(timeout);
      console.log("✅ MQTT connected successfully");
      isConnected = true;
      isConnecting = false;

      // Subscribe to pending topics
      if (pendingSubscriptions.size > 0) {
        console.log(
          `📬 Subscribing to ${pendingSubscriptions.size} pending topics`,
        );
        pendingSubscriptions.forEach((topic) => {
          client.subscribe(topic, { qos: 1 });
        });
        pendingSubscriptions.clear();
      }

      resolve();
    });

    client.on("error", (err) => {
      clearTimeout(timeout);
      console.error("❌ MQTT error:", err.message || err);

      // More specific error messages
      if (err.code === "ENOTFOUND") {
        console.error(
          "💡 DNS Error: Cannot resolve hostname. Check your MQTT_BROKER_URL",
        );
      } else if (err.code === "ECONNREFUSED") {
        console.error(
          "💡 Connection refused: Check if the broker is running and port is correct",
        );
      } else if (err.message?.includes("Not authorized")) {
        console.error(
          "💡 Authentication failed: Check your MQTT_USERNAME and MQTT_PASSWORD",
        );
      }

      isConnected = false;
      isConnecting = false;
      connectionPromise = null;
      reject(err);
    });

    client.on("close", () => {
      console.log("⚠️ MQTT connection closed");
      isConnected = false;
      connectionPromise = null;
    });

    client.on("reconnect", () => {
      console.log("🔄 MQTT reconnecting...");
    });

    client.on("offline", () => {
      console.log("📴 MQTT client offline");
      isConnected = false;
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      const messageStr = message.toString();
      console.log(
        `📨 Message received on ${topic}:`,
        messageStr.substring(0, 100),
      );

      const handler = messageHandlers.get(topic);
      if (handler) {
        try {
          handler(messageStr);
        } catch (err) {
          console.error(`❌ Error in message handler for ${topic}:`, err);
        }
      } else {
        console.log(`⚠️ No handler registered for topic: ${topic}`);
      }
    });
  });

  return connectionPromise;
}

function subscribe(topic) {
  if (!client || !isConnected) {
    pendingSubscriptions.add(topic);
    console.log(`📝 Topic queued for subscription: ${topic}`);
    return;
  }

  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error(`❌ Subscribe failed: ${topic}`, err);
    } else {
      console.log(`✅ Subscribed to: ${topic}`);
    }
  });
}

async function publish(topic, message, options = { qos: 1 }) {
  // Auto-connect if not connected
  if (!client || !isConnected) {
    console.log("⚠️ Not connected, connecting first...");
    await connect();
  }

  return new Promise((resolve, reject) => {
    client.publish(topic, message, options, (err) => {
      if (err) {
        console.error("❌ Publish error:", err);
        reject(err);
      } else {
        console.log(`✅ Published to ${topic}`);
        resolve();
      }
    });
  });
}

function onMessage(topic, handler) {
  messageHandlers.set(topic, handler);
  console.log(`✅ Message handler registered for: ${topic}`);
}

function removeMessageHandler(topic) {
  const existed = messageHandlers.delete(topic);
  if (existed) {
    console.log(`✅ Message handler removed for: ${topic}`);
  }
}

function getConnectionStatus() {
  return isConnected;
}

function disconnect() {
  if (client) {
    messageHandlers.clear();
    pendingSubscriptions.clear();
    client.end(true);
    client = null;
    isConnected = false;
    isConnecting = false;
    connectionPromise = null;
    console.log("✅ MQTT disconnected and cleaned up");
  }
}

// Singleton service instance
let serviceInstance = null;

function getMQTTService() {
  // Return existing service instance
  if (serviceInstance) {
    return serviceInstance;
  }

  // Create service instance once
  serviceInstance = {
    connect,
    publish,
    subscribe,
    onMessage,
    removeMessageHandler,
    getConnectionStatus,
    disconnect,
  };

  return serviceInstance;
}

export { getMQTTService };
