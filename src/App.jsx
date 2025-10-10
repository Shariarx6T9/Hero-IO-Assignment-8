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
    <Routes>
      {/* Normal pages layout */}
      <Route
        element={
          <>
            <Header />
            <main className="min-h-[72vh] py-6">
              <Outlet />
            </main>
            <Footer />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<AllApps />} />
        <Route path="/apps/:id" element={<AppDetails />} />
        <Route path="/installation" element={<MyInstallation />} />
      </Route>

      {/* NotFound Page (outside the layout) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
