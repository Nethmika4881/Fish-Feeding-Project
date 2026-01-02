"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#22c55e", // green
  "#f59e0b", // orange
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // deep orange
  "#06b6d4", // cyan
  "#84cc16", // lime
];
export default function FeedDistributionAmongTanks({ details }) {
  console.log(details, "Dedede");
  const data = details.map((data, index) => {
    return {
      tank: data.tank_name,
      value: data.feed_amount,
      color: COLORS[index % COLORS.length],
    };
  });
  return (
    <div className="mt-5 w-full rounded-xl bg-white p-2 shadow-sm">
      <Heading />
      <div className="hidden h-84 w-full md:block">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="tank"
              innerRadius={60}
              outerRadius={100}
              cx="50%"
              cy="50%"
              paddingAngle={2}
              label={({ name, value }) => `${name}: ${value}kg`} // show tank name + value
            >
              {data.map((entry) => (
                <Cell
                  key={entry.tank}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
            <Tooltip formatter={(value) => `${value}kg`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="h-84 w-full md:hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="tank"
              innerRadius={30}
              outerRadius={50}
              cx="50%"
              cy="50%"
              paddingAngle={2}
              label={({ name, value }) => `${name}: ${value}kg`} // show tank name + value
            >
              {data.map((entry) => (
                <Cell
                  key={entry.tank}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              iconSize={15}
              iconType="circle"
            />
            <Tooltip formatter={(value) => `${value}kg`} />
          </PieChart>
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
