import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
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
          fontWeight: "500",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
