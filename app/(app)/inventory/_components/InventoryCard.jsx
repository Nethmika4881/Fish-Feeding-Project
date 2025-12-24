"use client";
import { formatTwoDecimals } from "@/app/_services/helpUtils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Box } from "lucide-react";
import React from "react";
import EditInventoryDetails from "./EditInventoryDetails";

function InventoryCard({ inventoryDetails, inventory }) {
  const {
    id: feedId,
    feed_name: feedName,
    feed_type: feedType,
    quantity_now_kg: quantityNowInKG,
    low_stock_threshold_kg: lowStockThresholdKG,
    maxCapacity_kg: maxCapacityInKG,
  } = inventory;
  return (
    <div className="*: min-h-50 w-full overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="px-5 py-3">
        <CardHeader
          feedName={feedName}
          maxCapacityInKG={maxCapacityInKG}
          quantityNowInKG={quantityNowInKG}
          lowStockThresholdKG={lowStockThresholdKG}
        />
        <RemainingAmount
          maxCapacityInKG={maxCapacityInKG}
          quantityNowInKG={quantityNowInKG}
          lowStockThresholdKG={lowStockThresholdKG}
        />
      </div>
      <ViewInventoryDetailsButton
        feedId={feedId}
        inventoryDetails={inventoryDetails}
        inventory={inventory}
      />
    </div>
  );
}

export default InventoryCard;
function computeHealthStatus(quantityNowInKG, lowStockThresholdKG) {
  if (lowStockThresholdKG >= quantityNowInKG) {
    return "Low";
  }
  return "Good";
}
const RemainingAmount = function ({
  quantityNowInKG,
  maxCapacityInKG,
  lowStockThresholdKG,
}) {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(quantityNowInKG), 100);
    return () => clearTimeout(timer);
  }, [quantityNowInKG]);
  const progressValue = Math.min(
    Math.max((progress / maxCapacityInKG) * 100, 0),
    100,
  );
  const isWarning =
    computeHealthStatus(quantityNowInKG, lowStockThresholdKG) === "Low";

  return (
    <div className="my-7 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <span className="text-3xl font-semibold text-stone-800">
            {`${formatTwoDecimals(quantityNowInKG)}`}
          </span>
          <span className="place-self-end text-sm text-stone-700 opacity-70">
            {" "}
            kg remaining
          </span>
        </div>
        <Box size={40} color="#E0E3E8" />
      </div>
      <div className="mt-5 flex flex-col">
        <div className="flex items-center justify-between text-sm text-stone-500 opacity-80">
          <span>Level</span>
          <span>{`${progressValue.toFixed(1)}%`}</span>
        </div>
        <Progress
          value={progressValue}
          className={`w-full ${
            isWarning
              ? "bg-red-200 [&>div]:bg-red-500"
              : "bg-blue-200 [&>div]:bg-blue-500"
          }`}
        />
      </div>
    </div>
  );
};
function CardHeader({
  quantityNowInKG,
  maxCapacityInKG,
  lowStockThresholdKG,
  feedName,
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[1.1rem] font-bold">{feedName}</span>
        <span className="text-[.9rem] text-slate-500 opacity-80">
          Capacity : {`${maxCapacityInKG}kg`}
        </span>
      </div>
      <CardBadge
        quantityInKG={quantityNowInKG}
        lowStockThresholdKG={lowStockThresholdKG}
      />
    </div>
  );
}

function CardBadge({ quantityNowInKG, lowStockThresholdKG }) {
  const status = computeHealthStatus(quantityNowInKG, lowStockThresholdKG);
  const variant = status === "Low" ? "destructive" : "default";

  return (
    <Badge
      variant={variant}
      className={
        status === "Good" ? "bg-green-500 text-white hover:bg-green-600" : ""
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function ViewInventoryDetailsButton({ inventory, feedId, inventoryDetails }) {
  return (
    <div className="bg-stone-200 text-sm">
      <EditInventoryDetails
        feedId={feedId}
        inventoryDetails={inventoryDetails}
        inventory={inventory}
      />
    </div>
  );
}
