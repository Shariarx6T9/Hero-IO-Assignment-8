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
      <main className="min-h-[72vh] py-6">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* All Apps Page */}
          <Route path="/apps" element={<AllApps />} />

          {/* Individual App Details Page */}
          <Route path="/apps/:id" element={<AppDetails />} />

          {/* My Installed Apps */}
          <Route path="/installation" element={<MyInstallation />} />

          {/* Fallback / 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* ✅ Footer shown on all pages */}
      <Footer />
    </>
  );
}
