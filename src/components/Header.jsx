import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const headerStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
    color: "#f8fafc",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const logoStyle = {
    height: "40px",
  };

  const navStyle = {
    display: "flex",
    gap: "20px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#f8fafc",
    fontWeight: 500,
    fontSize: "16px",
  };

  const contributionBtnStyle = {
    background: "#2563eb",
    color: "#f8fafc",
    padding: "6px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        {/* Left: Logo + Project Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/assets/logo.png" alt="Hero IO" style={logoStyle} />
          <span style={{ fontWeight: 700, fontSize: "20px" }}>Hero IO</span>
        </div>

        {/* Middle: Navigation Links */}
        <nav style={navStyle}>
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/apps" style={navLinkStyle}>
            Apps
          </NavLink>
          <NavLink to="/installation" style={navLinkStyle}>
            Installation
          </NavLink>
        </nav>

        {/* Right: Contribution Button */}
        <div>
          <a
            href="https://github.com/shariarx6t9"
            target="_blank"
            rel="noreferrer"
            style={contributionBtnStyle}
          >
            Contribution
          </a>
        </div>
      </div>
    </header>
  );
}
