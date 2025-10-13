import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "70vh",
      }}
    >
      <img
        src="/assets/error-404.png" // The correct 404 image
        alt="404 Page Not Found"
        style={{ width: "100%", maxWidth: "400px", marginBottom: "2rem" }}
      />
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Oops, page not found!
      </h1>
      <p style={{ color: "#6b7280", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
        The page you are looking for is not available.
      </p>
      <Link
        to="/"
        className="btn"
        style={{
          backgroundColor: "#8b5cf6",
          color: "white",
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Go Home
      </Link>
    </div>
  );
}