import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import appsData from "../data/apps.json"; 
import { isInstalled, installApp, uninstallApp } from "../utils/localStorage";
import toast from "react-hot-toast";
import ReviewsChart from "../components/ReviewsChart";

export default function AppDetails() {
  const { id } = useParams();
  const appId = Number(id);
  const app = appsData.find(a => Number(a.id) === appId);
  const [installed, setInstalled] = useState(false);

  // ✅ Sync with localStorage on mount
  useEffect(() => {
    if (app) setInstalled(isInstalled(app.id));
  }, [id, app]);

  // ✅ Handle install/uninstall
  const handleInstall = () => {
    if (!installed) {
      installApp(app.id);
      setInstalled(true);
      toast.success(`${app.title} installed successfully`);
    } else {
      uninstallApp(app.id);
      setInstalled(false);
      toast.error(`${app.title} uninstalled`);
    }
    // ✅ Trigger storage event so MyInstallation updates automatically
    window.dispatchEvent(new Event("storage"));
  };

  if (!app) {
    return (
      <div className="container mx-auto text-center py-20">
        <img
          src="/assets/ui/Error-App Not Found.png"
          alt="App not found"
          className="mx-auto mb-4"
          style={{ maxWidth: 320 }}
        />
        <h3 className="text-xl font-bold">App Not Found</h3>
        <p className="text-gray-500 mb-4">
          This app may have been removed or the link is incorrect.
        </p>
        <Link to="/all-apps" className="btn border px-4 py-2 rounded">
          Back to Apps
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 grid gap-5">
      {/* Top Section */}
      <div className="flex flex-wrap gap-5 bg-white p-5 rounded shadow-md items-center">
        <img
          src={app.image}
          alt={app.title}
          className="w-40 h-40 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{app.title}</h2>
          <p className="text-gray-600">{app.companyName}</p>
          <p className="mt-2">
            ⭐ {app.ratingAvg} • {app.downloads.toLocaleString()} downloads • {app.reviews} reviews
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleInstall}
              className={`px-4 py-2 rounded font-semibold text-white ${installed ? "bg-gray-400" : "bg-blue-500"}`}
            >
              {installed ? "Installed" : "Install"}
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2 border rounded font-semibold text-gray-700"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="grid md:grid-cols-[1fr_360px] gap-5">
        <div className="bg-white p-5 rounded shadow-md">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="text-gray-700">{app.description}</p>
        </div>
        <div className="bg-white p-5 rounded shadow-md">
          <h4 className="text-lg font-semibold mb-2">Reviews</h4>
          <ReviewsChart ratings={app.ratings} />
        </div>
      </div>
    </div>
  );
}
