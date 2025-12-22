"use client";
import { Badge } from "@/components/ui/badge";
import { Box, Wifi, WifiOff } from "lucide-react";
import React from "react";

function DeviceCard({ device }) {
  const {
    device_code: deviceCode,
    status,
    tanks: { tank_name: tankName },
  } = device;

  return (
    <div className="min-h-20 w-full overflow-hidden rounded-xl bg-white px-5 py-3 shadow-sm">
      <CardHeader deviceCode={deviceCode} tankName={tankName} status={status} />
    </div>
  );
}

export default DeviceCard;

function computeStatusVariant(status) {
  switch (status.toLowerCase()) {
    case "online":
      return "healthy";
    case "offline":
      return "destructive";
  }
}

function CardHeader({ deviceCode, tankName, status }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[1.1rem] font-bold">{deviceCode}</span>
        <span className="text-[.9rem] text-slate-500 opacity-80">
          Location : {tankName}
        </span>
      </div>
      <CardBadge status={status} />
    </div>
  );
}

function CardBadge({ status }) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${status === "online" ? "bg-[#DBFCE7]" : "bg-[#FFE2E2]"}`}
    >
      {status === "online" ? (
        <Wifi color="#00A63E" size={20} />
      ) : (
        <WifiOff size={20} color="#E7000B" />
      )}
    </div>
  );
}
