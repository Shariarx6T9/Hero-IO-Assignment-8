import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import appsData from "../data/apps.json";
import { isInstalled, installApp } from "../utils/localStorage";
import toast from "react-hot-toast";
import ReviewsChart from "../components/ReviewsChart";

export default function AppDetails(){
  const { id } = useParams();
  const appId = Number(id);
  const app = appsData.find(a => a.id === appId);
  const [installed, setInstalled] = useState(false);

  useEffect(()=> {
    if (app) setInstalled(isInstalled(app.id));
  }, [id]);

  if (!app) {
    return (
      <div className="container center" style={{padding:40,flexDirection:'column'}}>
        <img src="/assets/ui/Error-App Not Found.png" alt="App not found" style={{maxWidth:320}} />
        <h3>App Not Found</h3>
        <p className="small">This app may have been removed or the link is incorrect.</p>
        <Link to="/apps" className="btn ghost">Back to Apps</Link>
      </div>
    );
  }

  const handleInstall = () => {
    if (!installed) {
      installApp(app.id);
      setInstalled(true);
      toast.success(`${app.title} installed`);
    }
  };

  return (
    <div className="container" style={{display:'grid',gap:20}}>
      <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
        <img src={app.image} alt={app.title} style={{width:160,height:160,objectFit:'cover',borderRadius:16}} />
        <div>
          <h2 style={{margin:0}}>{app.title}</h2>
          <div className="small">{app.companyName}</div>
          <p style={{margin:'8px 0'}}>{app.ratingAvg}★ • {app.downloads.toLocaleString()} downloads • {app.reviews} reviews</p>
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={handleInstall} disabled={installed}>{installed ? "Installed" : "Install"}</button>
            <a className="btn ghost" href="#" onClick={e=>e.preventDefault()}>Share</a>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20}}>
        <div>
          <h4>Description</h4>
          <p className="small">{app.description}</p>
        </div>

        <div style={{background:'white',padding:12,borderRadius:12}}>
          <h4 style={{marginTop:0}}>Reviews</h4>
          <ReviewsChart ratings={app.ratings} />
        </div>
      </div>
    </div>
  );
}
