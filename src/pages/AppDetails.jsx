// src/pages/AppDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appsData from "../data/apps.json";
import { installApp, isInstalled } from "../utils/localStorage";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const numericId = Number(id);
    const found = appsData.find((a) => Number(a.id) === numericId) || null;
    setApp(found);
    setInstalled(isInstalled(numericId));
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!app) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-4 px-3 py-2 border rounded"
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold">App not found</h2>
        <p>The App you requested is not found on our system. Try another one.</p>
      </div>
    );
  }

  const handleInstall = () => {
    installApp(app.id);
    setInstalled(true);
    toast.success(`${app.title} installed successfully!`);
  };

  const chartData = Array.isArray(app.ratings)
    ? app.ratings.map((r) => ({ name: r.name, count: Number(r.count || 0) }))
    : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={app.image}
            alt={app.title}
            className="rounded-xl shadow-lg max-h-80 object-contain"
          />
        </div>

        <div className="flex-1">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 px-3 py-2 border rounded"
          >
            <FaArrowLeft /> Back
          </button>

          <h1 className="text-3xl font-bold">{app.title}</h1>
          <p className="text-gray-500">{app.companyName}</p>

          <div className="flex items-center gap-4 mt-3">
            <div className="font-semibold">⭐ {app.ratingAvg?.toFixed(1) || 0}</div>
            <div>{Number(app.downloads || 0).toLocaleString()} downloads</div>
            <div>{Number(app.reviews || 0).toLocaleString()} reviews</div>
            <div>{app.size ? `${app.size} MB` : ""}</div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleInstall}
              disabled={installed}
              className={`px-6 py-2 rounded-lg text-white font-semibold ${
                installed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {installed ? "Installed" : "Install"}
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Ratings Breakdown</h3>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">About this app</h3>
            <p className="text-gray-700 whitespace-pre-line">{app.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
