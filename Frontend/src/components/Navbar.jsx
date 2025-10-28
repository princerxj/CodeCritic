import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav
      className={`backdrop-blur-md transition-colors duration-300 ${
        isDark
          ? "bg-slate-800/70 border-slate-700"
          : "bg-white/70 border-gray-200"
      } border-b sticky top-0 z-50 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1
            className={`text-3xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            CodeCr
            <span className="relative inline-block">
              <span className="absolute -top-[0.05rem] left-1/2 -translate-x-1/2 text-red-500 text-[0.5em]">
                ●
              </span>
              <span>ı</span>
            </span>
            t
            <span className="relative inline-block">
              <span className="absolute -top-[0.05rem] left-1/2 -translate-x-1/2 text-red-500 text-[0.5em]">
                ●
              </span>
              <span>ı</span>
            </span>
            c
          </h1>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Constructive reviews. Better results.
          </p>
        </div>

        <div className="flex items-center gap-4">
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
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414M2.05 6.464l2.83 2.83a1 1 0 001.414-1.414L3.464 5.05A1 1 0 102.05 6.464zm9.9-9.9a1 1 0 00-1.414 0l-2 2a1 1 0 001.414 1.414l2-2a1 1 0 000-1.414zM5.757 5.757a1 1 0 000 1.414L7.07 9.07a1 1 0 001.414-1.414L7.172 5.757a1 1 0 00-1.414 0zm9.9 9.9a1 1 0 000-1.414l-2-2a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0zM8.293 13.707a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-2 rounded-lg transition-all hover:bg-opacity-80"
              >
                {user.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border transition-colors duration-300 ${
                    isDark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`p-4 border-b ${
                      isDark ? "border-slate-700" : "border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 text-left text-sm font-medium flex items-center gap-2 transition-colors ${
                      isDark
                        ? "text-red-400 hover:bg-slate-700"
                        : "text-red-600 hover:bg-gray-100"
                    }`}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
