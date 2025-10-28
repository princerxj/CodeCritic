import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "highlight.js/styles/atom-one-light.css";

export default function ReviewPanel({ review, rateLimitError }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`backdrop-blur-lg border rounded-2xl shadow-lg p-6 transition-colors duration-300 ${
      isDark
        ? "bg-slate-800/60 border-slate-700"
        : "bg-white/80 border-gray-200"
    }`}>
      <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>AI Review</h2>
      <div className={`rounded-lg p-6 min-h-[350px] overflow-y-auto ${isDark ? "bg-slate-900" : "bg-gray-50"}`}>
        {rateLimitError && (
          <div className={`p-4 rounded-lg border-l-4 mb-4 ${
            isDark
              ? "bg-red-900/30 border-red-600 text-red-300"
              : "bg-red-50 border-red-500 text-red-800"
          }`}>
            <p className="font-semibold text-sm">{rateLimitError}</p>
            {rateLimitError.includes("daily limit") && (
              <button
                onClick={() => navigate("/login")}
                className={`mt-2 px-4 py-2 rounded font-medium transition-all ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Sign In
              </button>
            )}
          </div>
        )}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {review && !rateLimitError ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : !rateLimitError ? (
            <div className="space-y-6">
              <div className={` p-4 rounded ${
                isDark
                  ? "border-blue-600 bg-blue-900/30"
                  : "border-blue-500 bg-blue-50"
              }`}>
                <p className={`font-semibold text-sm ${isDark ? "text-blue-300" : "text-blue-900"}`}>
                  How it works
                </p>
                <p className={`text-sm mt-1 ${isDark ? "text-blue-200" : "text-blue-800"}`}>
                  Paste your code in the editor and click "Review
                  Code." CodeCritic will analyze it and return structured
                  insights.
                </p>
              </div>
              <div>
                <p className={`font-semibold text-sm mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  What's included:
                </p>
                <ul className={`space-y-2 text-sm list-disc list-inside ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  <li>Code quality and readability checks</li>
                  <li>Performance optimization opportunities</li>
                  <li>Best practice and design pattern adherence</li>
                  <li>Security and vulnerability checks</li>
                  <li>Error handling and edge case review</li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
