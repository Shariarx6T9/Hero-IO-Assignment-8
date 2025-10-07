import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppCard({ app }) {
  const navigate = useNavigate();
  return (
    <div className="app-card" onClick={() => navigate(`/apps/${app.id}`)}>
      <img src={app.image} alt={app.title} />
      <div className="meta">
        <h4>{app.title}</h4>
        <p className="small">{app.companyName} • {app.size} MB</p>
        <p className="small">Downloads: {app.downloads.toLocaleString()} • {app.ratingAvg}★ ({app.reviews} reviews)</p>
      </div>
      <div className="right">
        <div className="small">{Math.round(app.ratingAvg*10)/10}★</div>
        <div className="small">{app.downloads.toLocaleString()}</div>
      </div>
    </div>
  );
}
