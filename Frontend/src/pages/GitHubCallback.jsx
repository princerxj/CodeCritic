import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGitHub, loading } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("GitHub error:", error);
      navigate("/login");
      return;
    }

    if (code) {
      loginWithGitHub(code).then((result) => {
        if (result.success) {
          navigate("/");
        } else {
          navigate("/login");
        }
      });
    }
  }, [searchParams, navigate, loginWithGitHub]);

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDark ? "bg-slate-900" : "bg-slate-50"
    }`}>
      <div className="text-center">
        <div className="animate-spin mb-4">
          <div className={`h-12 w-12 border-4 rounded-full mx-auto ${isDark ? "border-slate-700 border-t-blue-500" : "border-slate-200 border-t-blue-600"}`} />
        </div>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Authenticating with GitHub...
        </p>
      </div>
    </div>
  );
}
