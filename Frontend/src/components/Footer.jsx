import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t backdrop-blur-md py-6 text-center text-sm transition-colors duration-300 ${
      isDark
        ? "border-slate-700 bg-slate-900/60 text-gray-400"
        : "border-gray-200 bg-white/60 text-gray-500"
    }`}>
      <p>© {new Date().getFullYear()} CodeCritic. All rights reserved.</p>
    </footer>
  );
}
