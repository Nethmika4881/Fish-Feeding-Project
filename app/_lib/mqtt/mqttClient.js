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
    return Promise.resolve();
  }
  // If currently connecting, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }
  isConnecting = true;
  connectionPromise = new Promise((resolve, reject) => {
    const brokerUrl = process.env.MQTT_BROKER_URL;
    const options = {
      clientId: "nextjs_server_mqtt_",
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clean: false,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      rejectUnauthorized: false,
    };
    console.log("Connecting to EMQX broker...");
    client = mqtt.connect(brokerUrl, options);

    // Timeout for connection
    const timeout = setTimeout(() => {
      isConnecting = false;
      connectionPromise = null;
      reject(new Error("MQTT connection timeout"));
    }, 30000);

    client.on("connect", () => {
      clearTimeout(timeout);
      console.log("✓ MQTT connected");
      isConnected = true;
      isConnecting = false;
      // Subscribe pending topics
      pendingSubscriptions.forEach((topic) => client.subscribe(topic));
      pendingSubscriptions.clear();
      resolve();
    });

    client.on("error", (err) => {
      clearTimeout(timeout);
      console.error("MQTT error:", err);
      isConnected = false;
      isConnecting = false;
      connectionPromise = null;
      reject(err);
    });

    client.on("close", () => {
      console.log("MQTT connection closed");
      isConnected = false;
      connectionPromise = null;
    });

    client.on("reconnect", () => {
      console.log("MQTT reconnecting...");
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      console.log(`✓ Message received on ${topic}`);
      const messageStr = message.toString();

      // Call handler registered for this specific topic
      const handler = messageHandlers.get(topic);
      if (handler) {
        try {
          handler(messageStr);
        } catch (err) {
          console.error(`Error in message handler for ${topic}:`, err);
        }
      } else {
        console.log(`No handler registered for topic: ${topic}`);
      }
    });
  });

  return connectionPromise;
}

function subscribe(topic) {
  if (!client || !isConnected) {
    pendingSubscriptions.add(topic);
    console.log(`Topic queued for subscription: ${topic}`);
    return;
  }
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (err) {
      console.error(`Subscribe failed: ${topic}`, err);
    } else {
      console.log(`✓ Subscribed: ${topic}`);
    }
  });
}

function publish(topic, message, options = { qos: 1 }) {
  if (!client || !isConnected) {
    throw new Error("MQTT not connected");
  }
  return new Promise((resolve, reject) => {
    client.publish(topic, message, options, (err) => {
      if (err) {
        console.error("Publish error:", err);
        reject(err);
      } else {
        console.log(`Published → ${topic}`);
        resolve();
      }
    });
  });
}

function onMessage(topic, handler) {
  // Register the handler for this topic
  messageHandlers.set(topic, handler);
  console.log(`✓ Message handler registered for: ${topic}`);
}

function removeMessageHandler(topic) {
  messageHandlers.delete(topic);
  console.log(`✓ Message handler removed for: ${topic}`);
}

function getConnectionStatus() {
  return isConnected;
}

function disconnect() {
  if (client) {
    messageHandlers.clear();
    client.end(true);
    client = null;
    isConnected = false;
    connectionPromise = null;
    console.log("✓ MQTT disconnected and cleaned up");
  }
}

function getMQTTService() {
  return {
    connect,
    publish,
    subscribe,
    onMessage,
    removeMessageHandler,
    getConnectionStatus,
    disconnect,
  };
}

export { getMQTTService };
