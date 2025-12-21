import mqtt from "mqtt";

let client = null;
let isConnected = false;
let isConnecting = false;
let connectionPromise = null;
const pendingSubscriptions = new Set();

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
      clientId: "nextjs_server_mqtt_" + Math.random().toString(16).substr(2, 8),
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clean: true,
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
  });

  return connectionPromise;
}

function subscribe(topic) {
  if (!client || !isConnected) {
    pendingSubscriptions.add(topic);
    return;
  }

  client.subscribe(topic, (err) => {
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
        console.log(`✓ Published → ${topic}`);
        resolve();
      }
    });
  });
}

function getConnectionStatus() {
  return isConnected;
}

function disconnect() {
  if (client) {
    client.end(true);
    client = null;
    isConnected = false;
    connectionPromise = null;
  }
}

function getMQTTService() {
  return {
    connect,
    publish,
    subscribe,
    getConnectionStatus,
    disconnect,
  };
}

export { getMQTTService };
