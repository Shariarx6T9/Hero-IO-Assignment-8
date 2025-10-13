// src/App.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllApps from "./pages/AllApps";
import AppDetails from "./pages/AppDetails";
import MyInstallation from "./pages/MyInstallation";
import NotFound from "./pages/NotFound"; // This is for search results
import PageNotFound from "./pages/PageNotFound"; // Import the new component

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <>
            <Header />
            <main className="min-h-[75vh] py-8 bg-gray-50">
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

      {/* This is the important change! */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}