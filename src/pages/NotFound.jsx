import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="container center" style={{padding:40,flexDirection:'column'}}>
      <img src="/assets/error-404.png" alt="404" style={{maxWidth:320}} />
      <h2>Page Not Found</h2>
      <p className="small">We couldn't locate that page. Try going back to the home page.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}
