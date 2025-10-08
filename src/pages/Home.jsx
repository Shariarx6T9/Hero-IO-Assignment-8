import React from "react";
import StateCard from "../components/StateCard";
import AppCard from "../components/AppCard";
import apps from "../data/apps.json";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const top8 = apps.slice(0,8);
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="hero">
        <div className="text">
          <h1>Discover the best apps for your life</h1>
          <p>Responsive app store UI — browse, install and manage your favorite apps.</p>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <a className="btn" href="https://apps.apple.com" target="_blank" rel="noreferrer">App Store</a>
            <a className="btn ghost" href="https://play.google.com" target="_blank" rel="noreferrer">Play Store</a>
          </div>
        </div>
        <div className="image">
          <img src="/assets/hero.png" alt="Hero" style={{width:'100%',borderRadius:12}} />
        </div>
      </div>

      <div className="states" style={{marginTop:16}}>
        <StateCard title="Popular" className="green">Top downloaded this week</StateCard>
        <StateCard title="New" className="orange">Recently added apps</StateCard>
        <StateCard title="Top Rated" className="blue">Highest user ratings</StateCard>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:18}}>
        <h3>Top Apps</h3>
        <button className="btn ghost" onClick={() => navigate("/apps")}>Show All</button>
      </div>

      <div className="grid" style={{marginTop:12}}>
        {top8.map(a => <AppCard key={a.id} app={a} />)}
      </div>
    </div>
  );
}