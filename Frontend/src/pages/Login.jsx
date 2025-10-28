import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Github, Code2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithGitHub, isAuthenticated, loading, error } = useAuth();
  const { isDark } = useTheme();
  const [githubLoading, setGithubLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGoogleSuccess = async (response) => {
    const result = await loginWithGoogle(response);
    if (result.success) {
      navigate("/");
    }
  };

  const handleGithubLogin = () => {
    setGithubLoading(true);
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/github/callback`;
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    window.location.href = authUrl;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      }`}>
        <div className="relative">
          <div className={`h-12 w-12 border-4 rounded-full animate-spin ${
            isDark ? "border-slate-700 border-t-blue-500" : "border-slate-200 border-t-blue-600"
          }`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 relative overflow-hidden ${
      isDark
        ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
    }`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? "bg-blue-600" : "bg-blue-400"
        }`} style={{ animationDuration: '4s' }} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse ${
          isDark ? "bg-purple-600" : "bg-purple-400"
        }`} style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className={`rounded-2xl shadow-2xl p-8 backdrop-blur-xl border transition-all duration-300 ${
          isDark
            ? "bg-slate-800/80 border-slate-700/50 shadow-blue-900/20"
            : "bg-white/90 border-gray-200/50 shadow-slate-200/50"
        }`}>
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-extrabold tracking-tight mb-3 ${
              isDark 
                ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            }`}>
              
            </h1>
            <p className={`text-base ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Sign in to continue your code review journey
            </p>
          </div>
          {error && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isDark
                ? "bg-red-900/30 border-red-700 text-red-300"
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div className="w-full">
              <div className={`w-full flex justify-center p-4 rounded-lg ${
                isDark ? "bg-slate-700/30" : "bg-gray-50"
              }`}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log("Google login failed")}
                  theme={isDark ? "filled_black" : "outline"}
                  size="large"
                  width="280"
                />
              </div>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  isDark ? "border-slate-700" : "border-gray-300"
                }`} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${
                  isDark ? "bg-slate-800 text-gray-500" : "bg-white text-gray-500"
                }`}>
                  Or
                </span>
              </div>
            </div>
            <button
              onClick={handleGithubLogin}
              disabled={githubLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
                githubLoading
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white"
                  : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white"
              }`}
            >
              <Github size={20} />
              {githubLoading ? "Redirecting..." : "Sign in with GitHub"}
            </button>
          </div>
          <div className={`mt-8 p-5 rounded-xl border ${
            isDark
              ? "bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700/50"
              : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
          }`}>
            <p className={`text-sm ${isDark ? "text-blue-300" : "text-blue-900"}`}>
              <strong>Free users:</strong> 1 code review per day
            </p>
            <p className={`text-sm mt-2 ${isDark ? "text-purple-300" : "text-purple-900"}`}>
              <strong>Registered users:</strong> Unlimited reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}