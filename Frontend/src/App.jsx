import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800">
      <Navbar />
      <HeroSection />
      <Home />
      <Footer />
    </div>
  );
}
