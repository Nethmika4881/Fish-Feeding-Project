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
import _ from "lodash";

function BoxGroup({ detailsWeekly, details, inventoryDetails }) {
  const totalInventory = inventoryDetails.reduce(
    (acc, cur) => acc + cur.quantity_now_kg,
    0,
  );
  const avgCostPerKg = inventoryDetails.reduce(
    (acc, cur) => acc + cur.cost_per_kg,
    0,
  );

  const { tank_name, feed_amount, log_count } = _.maxBy(details, "log_count");
  const avg =
    detailsWeekly.reduce((acc, cur) => acc + cur.total_feed_amount, 0) / 7;
  const iconSize = 18;
  return (
    <div className="mt-5 grid grid-cols-1 gap-6 bg-stone-50 md:grid-cols-2 lg:grid-cols-4">
      <Box
        topic="Avg Daily Using"
        icon={<HandCoins size={iconSize} color="#64748B" />}
        value={`${avg.toFixed(1)}kg`}
        subMsg="in this week avg usage per day"
      />

      <Box
        topic="Most Active Tank"
        icon={<FastForward size={iconSize} color="#64748B" />}
        value={tank_name}
        subMsg={`feeded ${feed_amount}kg in ${log_count} times`}
      />
      {/* depending on the avg usage we show this much of days can be use */}
      <Box
        topic="Feed Inventory Status"
        icon={<BoxIcon size={iconSize} color="#64748B" />}
        value={`${Math.floor(totalInventory / avg)} Days`}
        textColor=""
        subMsg="Estimated days remaining based on daily average usage per tank"
      />
      <Box
        topic="Est. Cost"
        textColor=""
        icon={<Banknote size={iconSize} color="#64748B" />}
        value={`${(avgCostPerKg * avg * 7).toFixed(1)} lkr`}
        subMsg="This Week"
      />
    </div>
  );
}

export default BoxGroup;
