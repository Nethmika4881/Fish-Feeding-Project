"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyConsumption({ detailsWeekly }) {
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
      (d) => d.day_name.trim() === dayTemplate.day,
    );
    return {
      day: dayTemplate.day,
      feedUsed: match ? parseFloat(match.total_feed_amount) : 0,
    };
  });

  console.log(data, "kama kama");
  return (
    <div className="mt-5 w-full rounded-xl bg-white p-4 shadow-sm">
      <Heading />
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}g`}
            />
            <Tooltip formatter={(value) => `${value}g`} />
            <Bar dataKey="feedUsed" fill="#0DA2E7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="mt-2 mb-4">
      <h1 className="text-[1rem] font-semibold">Weekly Consumption Trend</h1>
      <h4 className="text-sm text-stone-500 opacity-60">
        Daily feed usage over the last 7 days
      </h4>
    </div>
  );
}
