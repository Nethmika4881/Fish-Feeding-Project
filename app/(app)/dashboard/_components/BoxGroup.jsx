import { Activity, AlertTriangle, Droplets, Scale } from "lucide-react";
import Box from "./Box";

function BoxGroup({ numOfTanks, amountFeeded, getNumOfAlerts }) {
  const iconSize = 18;
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 bg-stone-50 md:grid-cols-2 lg:grid-cols-4">
      <Box
        topic="Total Tanks"
        icon={<Droplets size={iconSize} color="#64748B" />}
        value={numOfTanks}
        subMsg="num of tanks registered"
      />

      <Box
        topic="Today's Feeding"
        icon={<Scale size={iconSize} color="#64748B" />}
        value={`${amountFeeded.toFixed(1)}kg`}
        subMsg="today feeded amount in kg"
      />
      <Box
        topic="Active Alerts"
        icon={<AlertTriangle size={iconSize} color="red" />}
        value={getNumOfAlerts}
        textColor="text-red-500"
        subMsg="check these alerts now"
      />
      <Box
        topic="System Status"
        textColor="text-green-600"
        icon={<Activity size={iconSize} color="green" />}
        value="98%"
        subMsg="contact us if not resolved"
      />
    </div>
  );
}

export default BoxGroup;
