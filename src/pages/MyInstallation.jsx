// src/pages/MyInstallation.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInstalled, uninstallApp } from "../utils/localStorage";
import appsData from "../data/apps.json";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

export default function MyInstallation() {
  const [installedApps, setInstalledApps] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    const installedIds = getInstalled();
    const filtered = appsData.filter((app) => installedIds.includes(app.id));
    setInstalledApps(filtered);
  }, []);

  const handleUninstall = (id) => {
    uninstallApp(id);
    setInstalledApps((prev) => prev.filter((app) => app.id !== id));
    toast.info("App uninstalled successfully!");
  };

  const handleSort = (order) => {
    if (order === "default") {
      const installedIds = getInstalled();
      const filtered = appsData.filter((app) => installedIds.includes(app.id));
      setInstalledApps(filtered);
      setSortOrder("default");
      return;
    }

    const sorted = [...installedApps].sort((a, b) => {
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      return order === "asc" ? sizeA - sizeB : sizeB - sizeA;
    });
    setInstalledApps(sorted);
    setSortOrder(order);
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
        <img
          src="/assets/error-404.png"
          alt="No apps installed"
          className="w-64 mb-4"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h2 className="text-xl font-semibold mb-2">No Apps Installed</h2>
        <p className="text-gray-500 mb-4">
          You have not installed any apps yet.
        </p>

        
        <button
          onClick={() => navigate("/apps")}
          style={{ marginTop: "40px" }}
          className="btn !bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          Go to App
        </button>
      </div>
    );
  }

  // ---- Installed Apps Page ----
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

      {/* ---- Sort Dropdown ---- */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none"
        >
          <option value="default">Sort by Size</option>
          <option value="asc">Size: Low to High</option>
          <option value="desc">Size: High to Low</option>
        </select>
      </div>

      {/* ---- Installed Apps Grid ---- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {installedApps.map((app) => (
          <div
            key={app.id}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={app.image}
                alt={app.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {app.name}
                </h3>
                <div className="flex items-center gap-3 text-gray-500 text-sm mt-1">
                  <div className="flex items-center gap-1">
                    <img
                      src="/assets/icon-downloads.png"
                      alt="Downloads"
                      className="w-3.5 h-3.5"
                    />
                    <span>{app.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="/assets/icon-ratings.png"
                      alt="Ratings"
                      className="w-3.5 h-3.5"
                    />
                    <span>{app.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      src="/assets/icon-review.png"
                      alt="Size"
                      className="w-3.5 h-3.5"
                    />
                    <span>{app.size}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleUninstall(app.id)}
              className="mt-auto flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <FaTrashAlt className="w-3.5 h-3.5" /> Uninstall
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
