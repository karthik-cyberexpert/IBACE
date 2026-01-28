import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { year: 1987, offers: 20 },
  { year: 1997, offers: 80 },
  { year: 2007, offers: 180 },
  { year: 2017, offers: 300 },
  { year: 2026, offers: 381 }
];

/* 🔹 Custom Tooltip */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          padding: "10px 14px",
          borderRadius: "10px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          fontSize: "14px"
        }}
      >
        <strong>{label}</strong>
        <div style={{ color: "#007bff", marginTop: 4 }}>
          Offers: {payload[0].value}
        </div>
      </div>
    );
  }
  return null;
};

export default function PlacementLineChart() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setKey(k => k + 1), 3500);
    return () => clearInterval(i);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart key={key} data={data}>
        {/* Gradient definition */}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#007bff" />
            <stop offset="100%" stopColor="#00c6ff" />
          </linearGradient>
        </defs>

        {/* Soft grid */}
        <CartesianGrid strokeDasharray="3 6" strokeOpacity={0.3} />

        <XAxis
          dataKey="year"
          tick={{ fill: "#555", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#555", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* Glowing animated line */}
        <Line
          type="monotone"
          dataKey="offers"
          stroke="url(#lineGradient)"
          strokeWidth={4}
          dot={{
            r: 5,
            fill: "#007bff",
            stroke: "#fff",
            strokeWidth: 2
          }}
          activeDot={{
            r: 7,
            fill: "#00c6ff",
            stroke: "#fff",
            strokeWidth: 3
          }}
          animationDuration={1200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
