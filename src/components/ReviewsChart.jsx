import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ReviewsChart({ ratings }) {
  const data = ratings.map(r => ({ star: r.name.split(' ')[0], count: r.count }));
  return (
    <div style={{width:'100%', height:220}}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="star" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
