"use client";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Fish, Thermometer, Droplets } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MAX_TEMP = 30;
const MIN_TEMP = 10;

function TankCard({ tank }) {
  const {
    id: tankID,
    tank_name: name,
    fish_type: fishType,
    fish_count: population,
    max_population: maxPopulation,
    water_temperature: temperature,
    water_level_status: waterLevelStatus,
    recommended_feed_per_day: dailyFeedLimit,
  } = tank;

  return (
    <div className="min-h- w-full overflow-hidden rounded-xl bg-white shadow-sm">
      <CardHeader
        name={name}
        fishType={fishType}
        temperature={temperature}
        waterLevelStatus={waterLevelStatus}
      />

      <div className="mt-4 space-y-2">
        <div className="flex flex-col gap-3 p-4">
          <CardRowPopulation
            population={population}
            maxPopulation={maxPopulation}
          />
          <CardRowWaterLevel waterLevelStatus={waterLevelStatus} />
          <CardRowTemperature temperature={temperature} />
          <RecommendedFeedRow dailyFeedLimit={dailyFeedLimit} />
        </div>

        {/* Keep View Details button exactly at bottom */}
        <ViewDetailsButton tankID={tankID} />
      </div>
    </div>
  );
}

function computeHealthStatus(temp, waterLevelStatus) {
  if (temp < MIN_TEMP || temp > MAX_TEMP || waterLevelStatus === "low") {
    return "warning";
  }
  return "healthy";
}

function CardBadge({ temperature, waterLevelStatus }) {
  const status = computeHealthStatus(temperature, waterLevelStatus);
  const variant = status === "warning" ? "destructive" : "default";

  return (
    <Badge
      variant={variant}
      className={
        status === "healthy" ? "bg-green-500 text-white hover:bg-green-600" : ""
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function CardHeader({ name, temperature, fishType, waterLevelStatus }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{name}</span>
        <span className="text-[.8rem] opacity-50">{fishType}</span>
      </div>
      <CardBadge
        temperature={temperature}
        waterLevelStatus={waterLevelStatus}
      />
    </div>
  );
}

function CardRowPopulation({ population, maxPopulation }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex items-center gap-2 text-[.8rem] opacity-80">
        <Fish className="h-4 w-4" />
        <span>Population</span>
      </div>
      <span className="text-[.9rem] font-semibold">
        {population}/{maxPopulation}
      </span>
    </div>
  );
}

function CardRowTemperature({ temperature }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(temperature), 100);
    return () => clearTimeout(timer);
  }, [temperature]);

  const progressValue = Math.min(Math.max((progress / MAX_TEMP) * 100, 0), 100);
  const isWarning = temperature < MIN_TEMP || temperature > MAX_TEMP;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2 text-[.8rem] opacity-80">
          <Thermometer className="h-4 w-4" />
          <span>Temperature</span>
        </div>
        <span className="text-[.9rem] font-semibold">{temperature}°C</span>
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
  );
}

function CardRowWaterLevel({ waterLevelStatus }) {
  const progressValue = waterLevelStatus === "normal" ? 100 : 50;
  const isLow = waterLevelStatus === "low";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2 text-[.8rem] opacity-80">
          <Droplets className="h-4 w-4" />
          <span>Water Level</span>
        </div>
        <span className="text-[.9rem] font-semibold">{waterLevelStatus}</span>
      </div>
    </div>
  );
}

function RecommendedFeedRow({ dailyFeedLimit }) {
  return (
    <div className="mt-4 rounded-xl bg-[#F1F5F9] px-4 py-3 text-[.7rem]">
      <span className="text-stone-400">Recommended Feed:</span>{" "}
      <span className="font-semibold">{dailyFeedLimit}g / day</span>
    </div>
  );
}

function ViewDetailsButton({ tankID }) {
  const pathname = usePathname();
  return (
    <div className="bg-stone-200 text-sm">
      <Link
        href={`${pathname}/tankDetails/${tankID}`}
        className="inline-flex h-12 w-full items-center justify-between px-4 py-2 text-[.8rem] font-semibold"
      >
        <span>View Details</span>
        <span>&rarr;</span>
      </Link>
    </div>
  );
}

export default TankCard;
