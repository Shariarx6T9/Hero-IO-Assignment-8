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
        textAlign: "center",
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
      <Link
        to="/"
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
