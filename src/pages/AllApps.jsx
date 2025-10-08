// src/pages/AllApps.jsx
import React, { useState, useEffect } from "react";
import appsData from "../data/apps.json";
import AppCard from "../components/AppCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";

export default function AllApps() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(appsData);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("none");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      let filtered = appsData;

      if (query.trim() !== "") {
        const q = query.trim().toLowerCase();
        filtered = appsData.filter((a) => a.title.toLowerCase().includes(q));
      }

      if (sort === "high-low") {
        filtered = filtered.slice().sort((a, b) => b.downloads - a.downloads);
      } else if (sort === "low-high") {
        filtered = filtered.slice().sort((a, b) => a.downloads - b.downloads);
      }

      setResults(filtered);
      setLoading(false);
    }, 200);

    return () => clearTimeout(t);
  }, [query, sort]);

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <h2>All Apps</h2>
          <div style={{ color: "#666", fontSize: 14 }}>{results.length} apps</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <SearchBar value={query} onChange={setQuery} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e6e9ef",
            }}
          >
            <option value="none">Sort</option>
            <option value="high-low">High → Low downloads</option>
            <option value="low-high">Low → High downloads</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : results.length === 0 ? (
        <NotFound
          text="The App you are requesting is not found on our system. Please try another app."
          img="/assets/App-Error.png"
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {results.map((a) => (
            <AppCard key={a.id} app={a} />
          ))}
        </div>
      )}
    </div>
  );
}
