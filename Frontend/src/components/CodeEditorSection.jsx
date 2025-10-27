import React from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";

export default function CodeEditorSection({ code, setCode, isLoading, onReview }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Code</h2>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            prism.highlight(code, prism.languages.javascript, "javascript")
          }
          padding={16}
          className="min-h-[350px] font-mono text-gray-800"
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
      </div>

      <div className="mt-5 flex gap-4">
        <button
          onClick={onReview}
          disabled={isLoading}
          className={`flex-1 py-3 px-4 rounded-md text-white font-medium transition flex items-center justify-center shadow
            ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
        >
          {isLoading ? "Analyzing..." : "Review Code"}
        </button>
        <button
          onClick={() => setCode(`Type or paste your code here...`)}
          className="py-3 px-4 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
