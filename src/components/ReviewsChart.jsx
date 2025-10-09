import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function ReviewsChart({ ratings }) {
  const data = ratings
    .map((r) => ({
      star: r.name.split(" ")[0],
      count: r.count,
    }))
    .sort((a, b) => Number(b.star) - Number(a.star)); // fix string-to-number

  const colors = ["#FFD166", "#F6AE2D", "#F4A261", "#E76F51", "#E63946"];

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="star"
            type="category"
            tick={{ fontSize: 14, fill: "#374151" }}
            width={80}
            tickLine={false}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${value.toLocaleString()} reviews`,
              `${props.payload.star} Stars`,
            ]}
          />
          <Bar dataKey="count" radius={8}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
