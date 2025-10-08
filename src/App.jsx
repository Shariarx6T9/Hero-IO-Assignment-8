import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import AllApps from "./pages/AllApps";
import AppDetails from "./pages/AppDetails";
import MyInstallation from "./pages/MyInstallation";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      {/* ✅ Header shown on all pages */}
      <Header />

      {/* ✅ Main content area */}
      <main style={{ minHeight: "72vh", padding: "20px 0" }}>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* All Apps Page (includes search + app list) */}
          <Route path="/apps" element={<AllApps />} />

          {/* App Details Page (individual app info) */}
          <Route path="/apps/:id" element={<AppDetails />} />

          {/* My Installation Page */}
          <Route path="/my-installation" element={<MyInstallation />} />

          {/* ✅ Fallback for any unknown route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ✅ Footer shown on all pages */}
      <Footer />
    </>
  );
}
