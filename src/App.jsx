import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllApps from "./pages/AllApps";
import AppDetails from "./pages/AppDetails";
import MyInstallation from "./pages/MyInstallation";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />

      <main className="min-h-[75vh] py-8 bg-gray-50">
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<AllApps />} />
          <Route path="/apps/:id" element={<AppDetails />} />
          <Route path="/installation" element={<MyInstallation />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Nested content placeholder (if any future subroutes) */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
