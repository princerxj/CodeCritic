import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-md py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} CodeCritic. All rights reserved.</p>
    </footer>
  );
}
