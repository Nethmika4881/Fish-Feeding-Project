"use client";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const fakeData = [
  { day: "Mon", feedGrams: 1200 },
  { day: "Tues", feedGrams: 1350 },
  { day: "Wednes", feedGrams: 1100 },
  { day: "Thurs", feedGrams: 1500 },
  { day: "Fri", feedGrams: 1600 },
  { day: "Satur", feedGrams: 1800 },
  { day: "Sun", feedGrams: 1400 },
];

const isDarkMode = false;
const colors = isDarkMode
  ? {
      feedGrams: { stroke: "#4f46e5", fill: "#4f46e5" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      feedGrams: { stroke: "#0DA2E7", fill: "#D9F1FC" },
      text: "#888888",
      background: "#fff",
    };
function DailyFeedConsumption() {
  return (
    <div className="rounded-xl bg-white px-4 py-4 text-[.7rem] shadow-sm">
      <Heading />
      <ResponsiveContainer width="100%" className="my-10" height={300}>
        <AreaChart data={fakeData}>
          <defs>
            <linearGradient id="feedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0DA2E7" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#0DA2E7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="g"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* <CartesianGrid skeDasharray="3" /> */}
          <Area
            dataKey="feedGrams"
            type="monotone"
            stroke={colors.feedGrams.stroke}
            fill="url(#feedGradient)"
            strokeWidth={1}
            name="Total Grams"
            unit="g"
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Heading() {
  return (
    <div className="mt-2 mb-4">
      <h1 className="text-[1rem] font-semibold">Daily Feed Consumption</h1>
      <h4 className="text-sm opacity-60 text-shadow-stone-500">
        Total feed distributed across all tanks (grams)
      </h4>
    </div>
  );
}
export default DailyFeedConsumption;
