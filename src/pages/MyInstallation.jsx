import React, { useState, useEffect } from "react";
import appsData from "../data/apps.json";
import { getInstalled, uninstallApp } from "../utils/localStorage";
import toast from "react-hot-toast";

export default function MyInstallation() {
  const [installedIds, setInstalledIds] = useState(getInstalled());

  useEffect(() => {
    const onStorage = () => setInstalledIds(getInstalled());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const installedApps = installedIds
    .map((id) => appsData.find((a) => a.id === id))
    .filter(Boolean);

  const handleUninstall = (id, title) => {
    uninstallApp(id);
    setInstalledIds(getInstalled());
    toast(`${title} uninstalled`); // ✅ Toast shows now
  };

  return (
    <div className="container">
      <h3>My Installation</h3>
      {installedApps.length === 0 ? (
        <div className="center" style={{ padding: 40 }}>
          No apps installed
        </div>
      ) : (
        <div className="grid">
          {installedApps.map((a) => (
            <div
              key={a.id}
              style={{
                background: "white",
                padding: 12,
                borderRadius: 12,
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <img
                src={`/assets/${encodeURIComponent(a.image)}`}
                alt={a.title}
                style={{ width: 64, height: 64, borderRadius: 12 }}
                onError={(e) => {
                  e.target.src = "/assets/placeholder.png";
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{a.title}</div>
                <div className="small">{a.companyName}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  alignItems: "flex-end",
                }}
              >
                <button
                  className="btn ghost"
                  onClick={() => handleUninstall(a.id, a.title)}
                >
                  Uninstall
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
