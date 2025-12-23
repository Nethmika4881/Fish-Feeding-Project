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

const data = [
  { tank: "Tank A", value: 400, color: "#3b82f6" }, // blue
  { tank: "Tank B", value: 100, color: "#ef4444" }, // red
  { tank: "Tank C", value: 250, color: "#22c55e" }, // green
  { tank: "Tank D", value: 150, color: "#f59e0b" }, // orange
];

export default function FeedDistributionAmongTanks() {
  return (
    <div className="mt-5 w-full rounded-xl bg-white p-4 shadow-sm">
      <Heading />
      <div className="h-84 w-full">
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
              label={({ name, value }) => `${name}: ${value}g`} // show tank name + value
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
            <Tooltip formatter={(value) => `${value}g`} />
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
