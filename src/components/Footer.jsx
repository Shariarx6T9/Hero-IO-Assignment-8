import React from "react";

function IconGithub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.39.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.19.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.29 5.67.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A10.5 10.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 4.56a9.83 9.83 0 01-2.83.78A4.94 4.94 0 0022.4 3a9.86 9.86 0 01-3.13 1.2A4.92 4.92 0 0016.11 3c-2.73 0-4.95 2.24-4.95 5 0 .39.04.76.12 1.12A13.99 13.99 0 013 3.9a4.98 4.98 0 00-.67 2.52c0 1.73.88 3.25 2.22 4.14a4.88 4.88 0 01-2.24-.62v.06c0 2.36 1.67 4.33 3.88 4.78a4.9 4.9 0 01-2.22.08c.63 2 2.44 3.46 4.6 3.5A9.86 9.86 0 010 19.54 13.9 13.9 0 007.56 22c9.05 0 14-7.5 14-14v-.64A9.93 9.93 0 0023 4.56z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.25 2.25 0 11-.001 4.501A2.25 2.25 0 014.98 3.5zM3 8.98h3.98V21H3V8.98zM9.5 8.98h3.81v1.63h.05c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.07V21h-4V14.5c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.7-2.53 3.48V21h-4V8.98z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "#f8fafc",
        paddingTop: "32px",
        paddingBottom: "24px",
        marginTop: "60px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 200px" }}>
          <img src="/assets/logo.png" alt="Hero IO" style={{ height: 40 }} />
          <p style={{ marginTop: 8, color: "#cbd5e1", fontSize: "13px" }}>
            Hero IO — Discover and install apps. Built with modern web tech.
          </p>
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <div style={{ fontWeight: 700 }}>Product</div>
          <div style={{ marginTop: 8, color: "#cbd5e1" }}>Apps</div>
          <div style={{ color: "#cbd5e1" }}>Top Apps</div>
          <div style={{ color: "#cbd5e1" }}>My Installations</div>
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <div style={{ fontWeight: 700 }}>Company</div>
          <div style={{ marginTop: 8, color: "#cbd5e1" }}>About</div>
          <div style={{ color: "#cbd5e1" }}>Careers</div>
          <div style={{ color: "#cbd5e1" }}>Contact</div>
        </div>

        <div style={{ flex: "1 1 200px" }}>
          <div style={{ fontWeight: 700 }}>Follow</div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <a href="https://github.com/shariarx6t9" style={{ color: "#f1f5f9" }}><IconGithub /></a>
            <a href="https://twitter.com/shariarx6t9" style={{ color: "#f1f5f9" }}><IconTwitter /></a>
            <a href="https://linkedin.com/in/shariarx6t9" style={{ color: "#f1f5f9" }}><IconLinkedIn /></a>
          </div>
          <div style={{ marginTop: 12 }}>
            Email:{" "}
            <a href="mailto:hello@heroio.com" style={{ color: "#93c5fd" }}>
              hello@heroio.com
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          paddingTop: 12,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        <div>© {new Date().getFullYear()} Hero IO</div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="#" style={{ color: "#94a3b8" }}>Privacy</a>
          <a href="#" style={{ color: "#94a3b8" }}>Terms</a>
          <a href="#" style={{ color: "#94a3b8" }}>Support</a>
        </div>
      </div>
    </footer>
  );
}
