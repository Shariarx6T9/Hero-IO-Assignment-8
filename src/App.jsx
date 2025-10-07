import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllApps from "./pages/AllApps";
import AppDetails from "./pages/AppDetails";
import MyInstallation from "./pages/MyInstallation";
import NotFound from "./pages/NotFound";

export default function App(){
  return (
    <>
      <Header />
      <main style={{minHeight:'72vh'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<AllApps />} />
          <Route path="/apps/:id" element={<AppDetails />} />
          <Route path="/my-installation" element={<MyInstallation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
