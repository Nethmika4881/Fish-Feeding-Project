import { Activity, AlertTriangle, Droplets, Scale } from "lucide-react";
import Box from "./Box";

function BoxGroup() {
  const iconSize = 18;
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 bg-stone-50 md:grid-cols-2 lg:grid-cols-4">
      <Box
        topic="Total Tanks"
        icon={<Droplets size={iconSize} color="#64748B" />}
        value="5"
        subMsg="4 Healthy, 1 Warning"
      />

      <Box
        topic="Today's Feeding"
        icon={<Scale size={iconSize} color="#64748B" />}
        value="1.2kg"
        subMsg="4 Healthy, 1 Warning"
      />
      <Box
        topic="Active Alerts"
        icon={<AlertTriangle size={iconSize} color="red" />}
        value="3"
        textColor="text-red-500"
        subMsg="4 Healthy, 1 Warning"
      />
      <Box
        topic="System Status"
        textColor="text-green-600"
        icon={<Activity size={iconSize} color="green" />}
        value="98%"
        subMsg="4 Healthy, 1 Warning"
      />
    </div>
  );
}

export default BoxGroup;
