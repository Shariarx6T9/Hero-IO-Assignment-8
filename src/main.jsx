import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right" // ✅ Toast appears at the top-right
        toastOptions={{
          duration: 2500,
          style: {
            background: "#fff", // White background
            color: "#333", // Dark gray text
            borderRadius: "8px",
            border: "1px solid #e6e9ef",
            fontWeight: 500,
            padding: "10px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
