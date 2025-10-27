import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-light.css";

export default function ReviewPanel({ review }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Review</h2>
      <div className="bg-gray-50 rounded-lg p-6 min-h-[350px] overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                <p className="text-blue-900 font-semibold text-sm">
                  How it works
                </p>
                <p className="text-blue-800 text-sm mt-1">
                  Paste your code in the editor and click “Review
                  Code.” CodeCritic will analyze it and return structured
                  insights.
                </p>
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm mb-2">
                  What’s included:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                  <li>Code quality and readability checks</li>
                  <li>Performance optimization opportunities</li>
                  <li>Best practice and design pattern adherence</li>
                  <li>Security and vulnerability checks</li>
                  <li>Error handling and edge case review</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
