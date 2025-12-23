"use client";

import { timeAgo } from "@/app/_services/helpUtils";
import { AlertTriangle, Clock, Info, XCircle } from "lucide-react";

function WarningCard({ alertMsg }) {
  if (!alertMsg) return null;

  const {
    alert_type,
    title,
    created_at: createdAt,
    message,
    severity,
    tanks,
    devices,
  } = alertMsg;

  const tankName = tanks?.tank_name || "N/A";
  const deviceCode = devices?.device_code || "N/A";

  // Choose icon and colors based on severity
  const severityConfig = {
    info: {
      icon: <Info className="h-5 w-5 text-blue-500" />,
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-700",
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-700",
    },
    critical: {
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-700",
    },
  };

  const config = severityConfig[severity] || severityConfig.info;

  return (
    <div
      className={`flex w-full flex-col gap-2 rounded-xl border px-4 py-3 shadow-sm ${config.bg} ${config.border}`}
    >
      {/* Header with icon and title */}
      <div className="flex items-center gap-2">
        {config.icon}
        <h3 className={`text-sm font-semibold ${config.text}`}>{title}</h3>
      </div>

      {/* Message / details */}
      <p className="text-[0.8rem] font-semibold text-stone-600">
        {`${tankName} : ${message}`}
      </p>

      {/* Additional info */}
      <div className="mt-1 flex items-center justify-between text-[0.75rem] text-stone-500">
        <div className="flex items-center gap-1">
          <Clock size={15} />
          <span>{timeAgo(createdAt)}</span>
        </div>
        <span>Device: {deviceCode}</span>
      </div>
    </div>
  );
}

export default WarningCard;
{
  /*temperature', 'water_level', 'feeding_failed', 'feed_low', 'device_offline'])*/
}
// inform,warning,critical
