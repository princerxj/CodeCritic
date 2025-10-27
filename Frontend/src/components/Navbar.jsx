import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`backdrop-blur-md transition-colors duration-300 ${
      isDark
        ? "bg-slate-800/70 border-slate-700"
        : "bg-white/70 border-gray-200"
    } border-b sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            CodeCritic
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Constructive reviews. Better results.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-300 ${
            isDark
              ? "bg-slate-700 hover:bg-slate-600 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414M2.05 6.464l2.83 2.83a1 1 0 001.414-1.414L3.464 5.05A1 1 0 102.05 6.464zm9.9-9.9a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414l2-2a1 1 0 000-1.414zM5.757 5.757a1 1 0 000 1.414L7.07 9.07a1 1 0 001.414-1.414L7.172 5.757a1 1 0 00-1.414 0zm9.9 9.9a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0zM8.293 13.707a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
