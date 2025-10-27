import React from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import { useTheme } from "../context/ThemeContext";

export default function CodeEditorSection({ code, setCode, isLoading, onReview }) {
  const { isDark } = useTheme();

  return (
    <div className={`backdrop-blur-lg border rounded-2xl shadow-lg p-6 transition-colors duration-300 ${
      isDark
        ? "bg-slate-800/60 border-slate-700"
        : "bg-white/80 border-gray-200"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Your Code</h2>
      </div>

      <div className={`border rounded-md overflow-hidden ${isDark ? "bg-slate-900 border-slate-600" : "bg-white border-gray-300"}`}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={16}
          className={`min-h-[350px] font-mono ${isDark ? "text-gray-100" : "text-gray-800"}`}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
          }}
        />
      </div>

      <div className="mt-5 flex gap-4">
        <button
          onClick={onReview}
          disabled={isLoading}
          className={`flex-1 py-3 px-4 rounded-md text-white font-medium transition flex items-center justify-center shadow ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {isLoading ? "Analyzing..." : "Review Code"}
        </button>
        <button
          onClick={() => setCode(`Type or paste your code here...`)}
          className={`py-3 px-4 rounded-md font-medium border transition ${
            isDark
              ? "text-gray-300 border-slate-600 hover:bg-slate-700"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
