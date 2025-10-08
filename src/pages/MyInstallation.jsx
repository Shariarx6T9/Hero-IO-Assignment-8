// src/pages/MyInstallation.jsx
import React, { useEffect, useState } from "react";
import AppCard from "../components/AppCard";
import { getInstalled, uninstallApp } from "../utils/localStorage";
import appsData from "../data/apps.json"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyInstallation() {
  const [installedApps, setInstalledApps] = useState([]);

  const fetchInstalledApps = () => {
    const installedIds = getInstalled().map(id => Number(id));
    const matchedApps = appsData.filter(app => installedIds.includes(Number(app.id)));
    setInstalledApps(matchedApps);
  };

  useEffect(() => {
    fetchInstalledApps();

    // Listen to storage changes (multiple tabs)
    const handleStorageChange = (e) => {
      if (e.key === "installed_apps_v1") fetchInstalledApps();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleUninstall = (id) => {
    uninstallApp(id);
    fetchInstalledApps(); // ✅ update state
    toast.info("App Uninstalled!");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Installed Apps
      </h2>

      {installedApps.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">You haven’t installed any apps yet.</p>
          <p>
            Go to{" "}
            <span className="font-semibold text-indigo-600">All Apps</span> and
            install your favorite ones!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {installedApps.map((app) => (
            <div key={app.id} className="border p-4 rounded relative">
              <AppCard app={app} />
              <button
                onClick={() => handleUninstall(app.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
              >
                Uninstall
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
