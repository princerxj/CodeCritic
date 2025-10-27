import React from "react";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            CodeCritic
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Constructive reviews. Better results.
          </p>
        </div>
      </div>
    </nav>
  );
}
