
import React, { useEffect, useState } from "react";
import appsData from "../data/apps.json"; 
import { getInstalled, uninstallApp } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const MyInstallation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const navigate = useNavigate();

  // Load installed apps from localStorage
  useEffect(() => {
    const installedIds = getInstalled(); // returns array of installed app IDs
    const installed = appsData.filter((app) => installedIds.includes(app.id));
    setInstalledApps(installed);
  }, []);

  // Handle uninstall
  const handleUninstall = (id) => {
    uninstallApp(id); // remove from localStorage
    setInstalledApps((prev) => prev.filter((app) => app.id !== id));
  };

  // No apps installed view
  if (installedApps.length === 0) {
    return (
      <div 
      style={{
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
      className="flex flex-col items-center justify-center mt-20">
        <img
          src="/images/error-404.png" 
          alt="No apps installed"
          className="w-64 mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">No Apps Installed</h2>
        <p className="text-gray-500 mb-4">You have not installed any apps yet.</p>
        <button
          onClick={() => navigate("/")} // Go back to main App page
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to App
        </button>
      </div>
    );
  }

  // Apps installed view
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Installed Apps</h2>
      <div className="flex flex-col gap-3">
        {installedApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img
                src={app.icon} // small icon URL from apps.json
                alt={app.name}
                className="w-10 h-10 rounded"
              />
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-500">{app.size} MB</p>
              </div>
            </div>
            <button
              onClick={() => handleUninstall(app.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Uninstall
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInstallation;
