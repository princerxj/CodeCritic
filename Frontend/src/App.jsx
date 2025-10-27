import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

export default function App() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? "bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100"
        : "bg-linear-to-br from-slate-50 via-white to-slate-100 text-gray-800"
    }`}>
      <Navbar />
      <HeroSection />
      <Home />
      <Footer />
    </div>
  );
}
