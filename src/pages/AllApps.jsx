import React, { useState, useEffect } from "react";
import appsData from "../data/apps.json";
import AppCard from "../components/AppCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

export default function AllApps() {
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("downloads-desc");
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      let apps = [...appsData];

      // Filter by search query
      if (query) {
        apps = apps.filter((app) =>
          app.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Sort by downloads
      if (sortOrder === "downloads-desc") {
        apps.sort((a, b) => b.downloads - a.downloads);
      } else if (sortOrder === "downloads-asc") {
        apps.sort((a, b) => a.downloads - b.downloads);
      }

      setFilteredApps(apps);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, sortOrder]);

  // --- loading spinner ---
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // --- if no apps found, show NotFound.jsx ---
  if (filteredApps.length === 0) {
    return <NotFound />;
  }

  // --- otherwise show the apps list ---
  return (
    <div className="container">
      {/* Header */}
      <div className="header-center mb-12">
        <h1 className="text-4xl font-bold text-center">
          Our All Applications
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Explore All Apps on the Market developed by us. We code for Millions.
        </p>
      </div>

      {/* Sort + Search row */}
      <div className="sort-search-row mb-8 w-full max-w-4xl mx-auto">
        {/* Sort dropdown left */}
        <div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="downloads-desc">Downloads: High-Low</option>
            <option value="downloads-asc">Downloads: Low-High</option>
          </select>
        </div>

        {/* Search bar right */}
        <div className="w-full sm:w-64">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* App Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
