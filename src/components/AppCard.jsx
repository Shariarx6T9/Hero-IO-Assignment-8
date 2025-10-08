// src/components/AppCard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { installApp, uninstallApp, isInstalled } from "../utils/localStorage";
import toast from "react-hot-toast";

export default function AppCard({ app }) {
  const navigate = useNavigate();
  const [installed, setInstalled] = useState(isInstalled(app.id));

  useEffect(() => {
    const onStorage = () => setInstalled(isInstalled(app.id));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [app.id]);

  const handleInstallClick = (e) => {
    e.stopPropagation();
    if (installed) {
      uninstallApp(app.id);
      toast(`${app.title} uninstalled`);
    } else {
      installApp(app.id);
      toast(`${app.title} installed`);
    }
    setInstalled(!installed);
  };

  return (
    <div
      onClick={() => navigate(`/apps/${app.id}`)}
      style={{
        cursor: "pointer",
        background: "#fff",
        borderRadius: 12,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
      }}
      className="app-card"
    >
      <img
        src={app.image.startsWith("/assets") ? app.image : `/assets/${app.image}`}
        alt={app.title}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderRadius: 12,
        }}
        onError={(e) => (e.target.src = "/assets/placeholder.png")}
      />
      <div style={{ fontWeight: 700, fontSize: 16 }}>{app.title}</div>
      <div className="small" style={{ color: "#666" }}>
        {app.companyName} • {app.size} MB
      </div>
      <div className="small" style={{ color: "#666" }}>
        Downloads: {app.downloads.toLocaleString()} • {app.ratingAvg}★ ({app.reviews} reviews)
      </div>
      <button
        onClick={handleInstallClick}
        style={{
          marginTop: "auto",
          padding: "6px 12px",
          borderRadius: 8,
          border: "none",
          background: installed ? "#ccc" : "#4CAF50",
          color: installed ? "#333" : "#fff",
          cursor: "pointer",
        }}
      >
        {installed ? "Installed" : "Install"}
      </button>
    </div>
  );
}
