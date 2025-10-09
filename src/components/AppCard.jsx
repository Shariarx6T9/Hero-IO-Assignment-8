import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaDownload, FaStar } from 'react-icons/fa';
import { installApp, uninstallApp, isInstalled } from "../utils/localStorage";

export default function AppCard({ app }) {
  const navigate = useNavigate();
  const [installed, setInstalled] = useState(isInstalled(app.id));

  // Listen for storage changes to update UI across tabs/components
  useEffect(() => {
    const handleStorageChange = () => {
      setInstalled(isInstalled(app.id));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [app.id]);

  const handleInstallClick = (e) => {
    e.stopPropagation(); // Prevent navigating to details page when clicking the button
    
    if (installed) {
      uninstallApp(app.id);
      toast.error(`${app.title} uninstalled`);
    } else {
      installApp(app.id);
      toast.success(`${app.title} installed`);
    }
    // Manually trigger a storage event to notify other components
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div
      onClick={() => navigate(`/apps/${app.id}`)}
      className="app-card"
    >
      <img
        src={app.image}
        alt={app.title}
        className="app-card-image"
      />
      <div className="app-card-title">{app.title}</div>
      <div className="app-card-details">
        <span className="flex items-center gap-1"><FaDownload /> {(app.downloads / 1000000).toFixed(1)}M</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-yellow-500"><FaStar /> {app.ratingAvg}</span>
      </div>
      <button
        onClick={handleInstallClick}
        className={`app-card-install-btn ${installed ? 'installed' : 'install'}`}
        disabled={installed}
      >
        {installed ? "Installed" : "Install"}
      </button>
    </div>
  );
}