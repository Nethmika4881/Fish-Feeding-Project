// app/layout.jsx
import { Inter } from "next/font/google";
import { initializeMQTT } from "./_lib/mqtt/init";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fish Farm Management",
  description: "Manage your fish farm operations",
  themeColor: "#f4f4",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AquaFeedPro",
  },
};

// Initialize MQTT when the server starts
if (typeof window === "undefined") {
  // Only run on server side
  initializeMQTT().catch(console.error);
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
