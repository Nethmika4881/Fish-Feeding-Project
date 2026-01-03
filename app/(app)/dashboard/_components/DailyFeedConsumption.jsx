"use client";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = {
  feedGrams: { stroke: "#0DA2E7", fill: "#D9F1FC" },
  text: "#888888",
  background: "#fff",
};

function DailyFeedConsumption({ detailsWeekly = [] }) {
  const weekTemplate = [
    { day: "Mon", feedUsed: 0 },
    { day: "Tue", feedUsed: 0 },
    { day: "Wed", feedUsed: 0 },
    { day: "Thu", feedUsed: 0 },
    { day: "Fri", feedUsed: 0 },
    { day: "Sat", feedUsed: 0 },
    { day: "Sun", feedUsed: 0 },
  ];

  const data = weekTemplate.map((dayTemplate) => {
    const match = detailsWeekly.find(
      (d) => d.day_name?.trim() === dayTemplate.day,
    );
    return {
      day: dayTemplate.day,
      feedUsed: match ? parseFloat(match.total_feed_amount) || 0 : 0,
    };
  });

  return (
    <div className="col-span-2 rounded-xl bg-white px-4 py-4 text-[.7rem] shadow-sm lg:col-span-1">
      <Heading />
      <ResponsiveContainer width="100%" className="my-10" height={300}>
        <AreaChart data={data}>
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
          {/* Uncomment if you want grid lines */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Area
            dataKey="feedUsed"
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
      <h4 className="text-sm text-stone-500 opacity-60">
        Total feed distributed across all tanks (grams)
      </h4>
    </div>
  );
}

export default DailyFeedConsumption;
