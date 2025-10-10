import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
        style={{
          padding: "60px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
    >
      <img
        src="/assets/App-Error.png"
        alt="App Not Found"
        style={{ maxWidth: 320, marginBottom: 24 }}
      />
      <h2 style={{ marginBottom: 12 }}>
        The App you are requesting is not found on our system.
      </h2>
      <p style={{ marginBottom: 24, color: "#555" }}>
        Please try searching for another app.
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn !bg-purple-600 !text-white hover:!bg-purple-700 transition-colors"
>
       Go Home
      </button>

     </div>
  );
}
