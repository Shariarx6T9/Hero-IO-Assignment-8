import React, { useState, useEffect } from "react";
import appsData from "../data/apps.json";
import AppCard from "../components/AppCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AllApps() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(appsData);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("none");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      let filtered = appsData;
      const q = query.trim().toLowerCase();
      if (q) filtered = appsData.filter(a => a.title.toLowerCase().includes(q));
      if (sort === "high-low") filtered = filtered.slice().sort((a,b)=>b.downloads - a.downloads);
      if (sort === "low-high") filtered = filtered.slice().sort((a,b)=>a.downloads - b.downloads);
      setResults(filtered);
      setLoading(false);
    }, 220);
    return () => clearTimeout(t);
  }, [query, sort]);

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2>All Apps</h2>
          <div className="small">{results.length} apps</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <SearchBar value={query} onChange={setQuery} />
          <select value={sort} onChange={e => setSort(e.target.value)} style={{padding:10,borderRadius:10,border:'1px solid #e6e9ef'}}>
            <option value="none">Sort</option>
            <option value="high-low">High → Low downloads</option>
            <option value="low-high">Low → High downloads</option>
          </select>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : (
        results.length === 0 ? (
          <div className="center" style={{padding:40}}>No App Found</div>
        ) : (
          <div className="grid" style={{marginTop:12}}>
            {results.map(a => <AppCard key={a.id} app={a} />)}
          </div>
        )
      )}
    </div>
  );
}
