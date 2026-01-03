/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  reactStrictMode: false, // Disable to reduce React 19 dev errors
  reactCompiler: true,
  allowedDevOrigins: ["http://172.19.16.1:3000", "http://10.132.102.137:3000"],

  // Suppress source map warnings
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = "eval-source-map";
    }

    // Ensure MQTT only runs client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);
