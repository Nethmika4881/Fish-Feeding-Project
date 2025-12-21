"use client";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Fish, Thermometer, Droplets } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const maxTemp = 30;
const minTemp = 10;
const maxWaterLevel = 30;

function TankCard({ tank }) {
  const {
    id: tankID,
    name,
    population,
    temp: temperature,
    water_level: waterLevel,
    recommended_feed_limit_per_day: dailyFeedLimit,
    max_population: maxPopulation,
  } = tank;

  return (
    <div className="min-h- w-full overflow-hidden rounded-xl bg-white shadow-sm">
      <CardHeader
        name={name}
        temperature={temperature}
        waterLevel={waterLevel}
      />
      <div className="mt-4 space-y-2">
        <div className="flex flex-col gap-3 p-4">
          <CardRow1 population={population} maxPopulation={maxPopulation} />
          <CardRow2 temp={temperature} maxTemp={maxTemp} />
          <CardRow3 waterLevel={waterLevel} />
          <RecommendedFeedRow recommended_feed_limit_per_day={dailyFeedLimit} />
        </div>
        <ViewDetailsButton tankID={tankID} />
      </div>
    </div>
  );
}

function computeIsHealthy(temperature, waterLevel) {
  if (
    temperature < minTemp ||
    temperature > maxTemp ||
    waterLevel < maxWaterLevel
  ) {
    return "warning";
  }
  return "healthy";
}

function CardBadge({ temperature, waterLevel }) {
  const status = computeIsHealthy(temperature, waterLevel);
  const variant = status === "warning" ? "destructive" : "default";
  return (
    <Badge
      variant={variant}
      className={status === "healthy" ? "bg-green-500 hover:bg-green-600" : ""}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

function CardHeader({ name, temperature, waterLevel }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-lg font-semibold">{name}</span>
      <CardBadge temperature={temperature} waterLevel={waterLevel} />
    </div>
  );
}

function CardRow1({ population, maxPopulation }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex items-center gap-2">
        <Fish className="h-4 w-4" color="#64748B" />
        <span className="text-[.8rem] text-[#64748B] opacity-80">
          Population
        </span>
      </div>
      <span className="text-[.9rem] font-semibold">
        {population}/{maxPopulation}
      </span>
    </div>
  );
}

function CardRow2({ temp, maxTemp }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(temp), 100);
    return () => clearTimeout(timer);
  }, [temp]);

  // Scale temp to percentage (assuming 0-40°C range)
  const progressValue = Math.min(Math.max((progress / maxTemp) * 100, 0), 100);
  const isWarning = temp < minTemp || temp > maxTemp;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2">
          <Thermometer className="h-4 w-4" color="#64748B" />
          <span className="text-[.8rem] text-[#64748B] opacity-80">
            Temperature
          </span>
        </div>
        <span className="text-[.9rem] font-semibold">{temp}°C</span>
      </div>
      <Progress
        value={progressValue}
        className={`w-full ${isWarning ? "bg-red-200 [&>div]:bg-red-500" : "bg-blue-200 [&>div]:bg-blue-500"}`}
      />
    </div>
  );
}

function CardRow3({ waterLevel }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(waterLevel), 100);
    return () => clearTimeout(timer);
  }, [waterLevel]);

  const progressValue = Math.min(Math.max((progress / 100) * 100, 0), 100);
  const isLow = waterLevel < maxWaterLevel;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2">
          <Droplets className="h-4 w-4" color="#64748B" />
          <span className="text-[.8rem] text-[#64748B] opacity-80">
            Water Level
          </span>
        </div>
        <span className="text-[.9rem] font-semibold">{waterLevel}%</span>
      </div>
      <Progress
        value={progressValue}
        className={`w-full ${isLow ? "bg-red-200 [&>div]:bg-red-500" : "bg-blue-200 [&>div]:bg-blue-500"}`}
      />
    </div>
  );
}

function RecommendedFeedRow({ recommended_feed_limit_per_day }) {
  return (
    <div className="mt-10 rounded-xl bg-[#F1F5F9] px-4 py-3 text-[.7rem]">
      <span className="text-stone-400"> Recommended Feed:</span>{" "}
      <span className="font-semibold">
        {" "}
        {recommended_feed_limit_per_day}g / day
      </span>
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
