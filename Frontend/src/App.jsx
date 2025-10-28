import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import GitHubCallback from "./pages/GitHubCallback";
import ProtectedRoute from "./components/ProtectedRoute";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";
import "./App.css";

function AppContent() {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100"
          : "bg-linear-to-br from-green-50 via-white to-green-100 text-gray-800"
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/github/callback" element={<GitHubCallback />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <HeroSection />
                <Home />
              </>
            ) : (
              <>
                <HeroSection />
                <Home />
              </>
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
