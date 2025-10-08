import React, { useEffect, useState } from "react";
import AppCard from "../components/AppCard";
import { getInstalled, uninstallApp } from "../utils/localStorage";
import appsData from "../data/apps.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import errorImage from "../assets/error-404.png";

export default function MyInstallation() {
const [installedApps, setInstalledApps] = useState([]);

const fetchInstalledApps = () => {
const installedIds = getInstalled().map((id) => Number(id));
const matchedApps = appsData.filter((app) =>
installedIds.includes(Number(app.id))
);
setInstalledApps(matchedApps);
};

useEffect(() => {
fetchInstalledApps();
const handleStorageChange = (e) => {
if (e.key === "installed_apps_v1") fetchInstalledApps();
};
window.addEventListener("storage", handleStorageChange);
return () => window.removeEventListener("storage", handleStorageChange);
}, []);

const handleUninstall = (id, title) => {
uninstallApp(id);
fetchInstalledApps();
toast.info(`${title} Uninstalled!`);
};

return ( <div className="min-h-screen bg-gray-50 flex flex-col">
{/* Header Section */} <div className="text-center py-16 bg-gray-50"> <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
Your Installed Apps </h2> <p className="text-gray-500">
Explore All Trending Apps on the Market developed by us </p> </div>

```
  {/* Main Content */}
  <div className="max-w-3xl mx-auto w-full px-4">
    {installedApps.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
        <img
          src={errorImage}
          alt="No apps found"
          className="mb-8 w-64 object-contain"
        />
        <p className="text-xl font-semibold text-gray-800 mb-2">
          No installed apps found!
        </p>
        <p className="text-gray-500">
          Go to{" "}
          <span className="font-semibold text-indigo-600">All Apps</span>{" "}
          and install your favorite ones.
        </p>
      </div>
    ) : (
      <div className="flex flex-col gap-4 mt-8">
        {installedApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            <div className="flex items-center gap-4">
              <img
                src={app.image}
                alt={app.title}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {app.title}
                </h3>
                <p className="text-sm text-gray-500">{app.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleUninstall(app.id, app.title)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition text-sm font-medium"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
    )}
  </div>

  <ToastContainer position="bottom-right" />
</div>
);
}
