import React from "react";

export default function StateCard({ title, children, className }) {
  return (
    <div className={`state-card ${className}`}>
      <h4 style={{margin:0}}>{title}</h4>
      <div style={{marginTop:8}}>{children}</div>
    </div>
  );
}
