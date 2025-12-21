import mqtt from "mqtt";

let client = null;
let isConnected = false;
let isConnecting = false;

const pendingSubscriptions = new Set();

function connect() {
  if (client || isConnecting) return;

  isConnecting = true;

  const brokerUrl = process.env.MQTT_BROKER_URL;

  const options = {
    clientId: "nextjs_server_mqtt", // fixed,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
  };

  console.log("Connecting to EMQX broker...");
  client = mqtt.connect(brokerUrl, options);

  client.on("connect", () => {
    console.log("✓ MQTT connected");
    isConnected = true;
    isConnecting = false;

    // Subscribe pending topics
    pendingSubscriptions.forEach((topic) => client.subscribe(topic));
    pendingSubscriptions.clear();
  });

  client.on("error", (err) => {
    console.error("MQTT error:", err);
    isConnected = false;
    isConnecting = false;
  });

  client.on("close", () => {
    console.log("MQTT connection closed");
    isConnected = false;
  });

  client.on("reconnect", () => {
    console.log("MQTT reconnecting...");
  });
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

  client.publish(topic, message, options, (err) => {
    if (err) {
      console.error("Publish error:", err);
    } else {
      console.log(`✓ Published → ${topic}`);
    }
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
  }
}

function getMQTTService() {
  if (!client) connect();

  return {
    connect,
    publish,
    subscribe,
    getConnectionStatus,
    disconnect,
  };
}

export { getMQTTService };
