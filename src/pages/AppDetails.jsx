import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import appsData from "../data/apps.json";
import { installApp, isInstalled } from "../utils/localStorage";
import { toast } from "react-hot-toast";
import iconReview from "../assets/icon-review.png";
import iconRatings from "../assets/icon-ratings.png";
import iconDownloads from "../assets/icon-downloads.png";
import "../index.css";

export default function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const numericId = Number(id);
    const foundApp = appsData.find((a) => a.id === numericId);
    if (foundApp) {
      setApp(foundApp);
      setInstalled(isInstalled(numericId)); // check if already installed
    }
  }, [id]);

  const handleInstall = () => {
    if (app && !installed) {
      installApp(app.id);   // adds app to localStorage
      setInstalled(true);   // updates UI
      toast.success(`${app.title} installed successfully!`);
    }
  };

  // ✅ If app not found
  if (!app) {
    return (
      <div
        className="center"
        style={{
          minHeight: "70vh",
          flexDirection: "column",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <h2>The App you are requesting is not found on our system.</h2>
        <button
          onClick={() => navigate("/")}
          className="btn"
          style={{ color: "white", textDecoration: "none" }}
        >
          Go Home
        </button>
      </div>
    );
  }

  const chartData = [
    { name: "5 star", value: 11500 },
    { name: "4 star", value: 6500 },
    { name: "3 star", value: 4000 },
    { name: "2 star", value: 2200 },
    { name: "1 star", value: 900 },
  ];

  return (
    <div className="app-details" style={{ padding: "60px 20px" }}>
      {/* ===== Header Section ===== */}
      <div
        className="details-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img
          src={app.image}
          alt={app.title}
          className="app-image"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />

        <div className="details-info" style={{ maxWidth: "600px" }}>
          <h2 style={{ marginBottom: "8px", fontSize: "28px" }}>{app.title}</h2>
          <p style={{ marginBottom: "16px", color: "#6b7280" }}>
            Developed by{" "}
            <span className="dev-name" style={{ color: "#0b61ff" }}>
              {app.companyName}
            </span>
          </p>

          <div
            className="stats-row"
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div
              className="stat-item"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img src={iconDownloads} alt="downloads" width="28" height="28" />
              <div>
                <p style={{ fontSize: "13px", color: "#6b7280" }}>Downloads</p>
                <h3>{app.downloads.toLocaleString()}</h3>
              </div>
            </div>

            <div
              className="stat-item"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img src={iconRatings} alt="ratings" width="28" height="28" />
              <div>
                <p style={{ fontSize: "13px", color: "#6b7280" }}>Average Rating</p>
                <h3>{app.ratingAvg}</h3>
              </div>
            </div>

            <div
              className="stat-item"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img src={iconReview} alt="review" width="28" height="28" />
              <div>
                <p style={{ fontSize: "13px", color: "#6b7280" }}>Total Reviews</p>
                <h3>{app.reviews.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          {/* ===== Install Button ===== */}
          <button
            onClick={handleInstall}
            disabled={installed}
            className={`btn install-btn`}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: installed ? "#9ca3af" : "#22c55e",
              cursor: installed ? "not-allowed" : "pointer",
            }}
          >
            {installed ? "Installed" : `Install Now (${app.size} MB)`}
          </button>
        </div>
      </div>

      {/* ===== Ratings Chart Section ===== */}
      <div
        className="ratings-section"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        <h3 style={{ marginBottom: "20px", fontSize: "22px" }}>Ratings</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              domain={[0, Math.max(...chartData.map((d) => d.value))]}
              axisLine={false}
              tickLine={false}
            />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="value" fill="#ff8c00" radius={[5, 5, 5, 5]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Description Section ===== */}
      <div
        className="description-section"
        style={{
          marginTop: "60px",
          maxWidth: "800px",
          marginInline: "auto",
          background: "var(--card)",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "var(--soft-shadow)",
          textAlign: "left",
        }}
      >
        <h3 style={{ marginBottom: "12px", fontSize: "22px" }}>Description</h3>
        <p style={{ color: "#4b5563", lineHeight: 1.6 }}>{app.description}</p>
      </div>
    </div>
  );
}
