import React, { useState, useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism.css";
import CodeEditorSection from "../components/CodeEditorSection";
import ReviewPanel from "../components/ReviewPanel";
import { getCodeReview } from "../utils/api";

export default function Home() {
  const [code, setCode] = useState(`Type or paste your code here...`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function handleReview() {
    try {
      setIsLoading(true);
      const data = await getCodeReview(code);
      setReview(data);
    } catch (error) {
      console.error("Error getting review:", error);
      setReview("Error getting code review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div id="editor-section" className="mt-4">
      <main className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <CodeEditorSection
          code={code}
          setCode={setCode}
          isLoading={isLoading}
          onReview={handleReview}
        />
        <ReviewPanel review={review} />
      </main>
    </div>
  );
}
