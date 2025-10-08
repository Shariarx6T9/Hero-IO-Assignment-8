import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import appsData from "../data/apps.json";
import { isInstalled, installApp, uninstallApp } from "../utils/localStorage";
import toast from "react-hot-toast";
import downloadsIcon from "../assets/icon-downloads.png";
import ratingsIcon from "../assets/icon-ratings.png";
import reviewsIcon from "../assets/icon-review.png";
import logo from "../assets/logo.png";

export default function AppDetails() {
  const { id } = useParams();
  const appId = Number(id);
  const app = appsData.find((a) => a.id === appId);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (app) setInstalled(isInstalled(app.id));
  }, [app]);

  const handleInstall = () => {
    if (!installed) {
      installApp(app.id);
      setInstalled(true);
      toast.success(`${app.title} installed successfully!`);
    } else {
      uninstallApp(app.id);
      setInstalled(false);
      toast.error(`${app.title} uninstalled`);
    }
    window.dispatchEvent(new Event("storage"));
  };

  if (!app) {
    return (
      <div className="container mx-auto text-center py-20">
        <img
          src="/assets/App-Error.png"
          alt="App not found"
          className="mx-auto mb-4 w-72"
        />
        <h3 className="text-xl font-bold">App Not Found</h3>
        <p className="text-gray-500 mb-4">
          This app may have been removed or the link is incorrect.
        </p>
        <Link
          to="/apps"
          className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Back to Apps
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <span className="font-semibold text-gray-700">HERO.IO</span>
          </div>

          <nav className="flex gap-6 text-gray-700 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/apps" className="hover:text-indigo-600">Apps</Link>
            <Link to="/installation" className="hover:text-indigo-600">Installation</Link>
          </nav>

          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
            Contribute
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1">
        {/* App Card */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* App Image */}
          <img
            src={app.image}
            alt={app.title}
            className="w-44 h-44 object-contain rounded-lg"
          />

          {/* App Info */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">{app.title}</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Developed by <span className="text-indigo-600 font-medium">{app.companyName}</span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-6">
              {/* Downloads */}
              <div className="flex items-center gap-3">
                <img src={downloadsIcon} alt="Downloads" className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-500">Downloads</p>
                  <p className="text-lg font-semibold text-gray-800">{(app.downloads / 1000000).toFixed(0)}M</p>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-3">
                <img src={ratingsIcon} alt="Ratings" className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-500">Average Ratings</p>
                  <p className="text-lg font-semibold text-gray-800">{app.ratingAvg}</p>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-3">
                <img src={reviewsIcon} alt="Reviews" className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-500">Reviews</p>
                  <p className="text-lg font-semibold text-gray-800">{app.reviews.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Install Button */}
            <button
              onClick={handleInstall}
              className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white transition ${
                installed ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {installed ? "Installed" : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>

        {/* Ratings Section */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ratings</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const ratingObj = app.ratings.find(r => r.name.startsWith(star));
              if (!ratingObj) return null;
              const percentage = (ratingObj.count / Math.max(...app.ratings.map(r => r.count))) * 100;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-12">{star} ★</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{ratingObj.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Description */}
        <section className="mt-10 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{app.description}</p>
        </section>
      </main>
    </div>
  );
}
