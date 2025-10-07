import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="center" style={{padding:40}}>
      <div style={{width:40,height:40,borderRadius:20,background:'#e6e9ef',display:'inline-block',animation:'spin 1s linear infinite'}}/>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
