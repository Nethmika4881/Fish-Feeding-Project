import {
  Activity,
  AlertTriangle,
  Banknote,
  BoxIcon,
  Droplets,
  FastForward,
  HandCoins,
  Scale,
} from "lucide-react";
import Box from "./Box";

function BoxGroup() {
  const iconSize = 18;
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 bg-stone-50 md:grid-cols-2 lg:grid-cols-4">
      <Box
        topic="Avg Daily Using"
        icon={<HandCoins size={iconSize} color="#64748B" />}
        value="500g"
        subMsg="+12% from last week"
      />

      <Box
        topic="Most Active Tank"
        icon={<FastForward size={iconSize} color="#64748B" />}
        value="Tank A"
        subMsg="35% of total consumption"
      />
      {/* depending on the avg usage we show this much of days can be use */}
      <Box
        topic="Feed Inventory Status"
        icon={<BoxIcon size={iconSize} color="#64748B" />}
        value="3 Days"
        textColor=""
        subMsg="Estimated days remaining based on daily average usage per tank"
      />
      <Box
        topic="Est. Cost"
        textColor=""
        icon={<Banknote size={iconSize} color="#64748B" />}
        value="$45.00"
        subMsg="This Week"
      />
    </div>
  );
}

export default BoxGroup;
