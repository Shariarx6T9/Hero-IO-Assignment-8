// src/pages/InstalledApps.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInstalled, uninstallApp } from "../utils/localStorage";
import apps from "../data/apps.json"; // full app list (with id, title, image, etc.)

export default function InstalledApps() {
  const [installedApps, setInstalledApps] = useState([]);
  const [sortBy, setSortBy] = useState("rating"); // default sort
  const navigate = useNavigate();

  useEffect(() => {
    const installedIds = getInstalled();
    const filtered = apps.filter((app) => installedIds.includes(app.id));
    setInstalledApps(filtered);
  }, []);

  // ---- format helpers ----
  const formatDownloads = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num;
  };

  const formatSize = (size) => {
    if (!size) return "—";
    const num = parseFloat(size);
    if (isNaN(num)) return size;
    return `${num} MB`;
  };

  // ---- sorting logic ----
  const sortApps = (list, key) => {
    switch (key) {
      case "name":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      case "downloads":
        return [...list].sort((a, b) => b.downloads - a.downloads);
      case "size":
        return [...list].sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
      default:
        return list;
    }
  };

  const handleSortChange = (e) => {
    const key = e.target.value;
    setSortBy(key);
    setInstalledApps((prev) => sortApps(prev, key));
  };

  const handleUninstall = (id) => {
    uninstallApp(id);
    setInstalledApps((prev) => prev.filter((app) => app.id !== id));
  };

  // ---- Empty State ----
  if (installedApps.length === 0) {
    return (
      <div
        style={{
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="text-xl font-semibold mb-2">No Apps Installed</h2>
        <p className="text-gray-500 mb-4">
          You have not installed any apps yet.
        </p>

        <button
          onClick={() => navigate("/apps")}
          style={{
            marginTop: "40px",
            background: "#007bff",
            color: "#fff",
            padding: "10px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to App
        </button>
      </div>
    );
  }

  // ---- Main Installed Apps List ----
  return (
    <div className="px-8 py-8 bg-white">
      {/* ---- Page Header ---- */}
      <div className="header-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Installed Apps
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      {/* Header Row */}
      <div
        className="sort-search-row"
        style={{
          marginBottom: "1.5rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: 600 }}>
          {installedApps.length}{" "}
          {installedApps.length === 1 ? "App Found" : "Apps Found"}
        </h2>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "#fff",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          <option value="rating">Sort By Rating</option>
          <option value="downloads">Sort By Downloads</option>
          <option value="size">Sort By Size</option>
          <option value="name">Sort By Name</option>
        </select>
      </div>

      {/* App List */}
      <div className="flex flex-col gap-3">
        {installedApps.map((app) => (
          <div
            key={app.id}
            className="app-card"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left: Icon + Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={app.image}
                alt={app.title}
                width="56"
                height="56"
                style={{ borderRadius: "12px", objectFit: "cover" }}
              />
              <div>
                <h4 style={{ fontWeight: 600, fontSize: "16px" }}>
                  {app.title}
                </h4>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div className="flex items-center gap-1 font-semibold">
                    <span className="text-yellow-500 text-base">⭐</span>
                    <span className="font-bold text-black">
                      {app.ratingAvg}
                    </span>
                  </div>
                  <span>⬇️ {formatDownloads(app.downloads)}</span>
                  <span>💾 {formatSize(app.size)}</span>
                </div>
              </div>
            </div>

            {/* Right: Uninstall Button */}
            <button
              className="btn ghost"
              onClick={() => handleUninstall(app.id)}
              style={{ width: "90px", textAlign: "center" }}
            >
              Uninstall
            </button>
          </div>
        ))}

        {installedApps.length === 0 && (
          <p style={{ color: "var(--muted)" }}>No installed apps found.</p>
        )}
      </div>
    </div>
  );
}
