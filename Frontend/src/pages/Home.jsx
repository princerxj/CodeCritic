import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import prism from "prismjs";
import "prismjs/themes/prism.css";
import CodeEditorSection from "../components/CodeEditorSection";
import ReviewPanel from "../components/ReviewPanel";
import { useAuth } from "../context/AuthContext";
import { getCodeReview, getCredits } from "../utils/api";

export default function Home() {
  const [code, setCode] = useState(`Type or paste your code here...`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState("");
  const [credits, setCredits] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    prism.highlightAll();
    async function fetchCredits() {
      try {
        const data = await getCredits();
        setCredits(data.credits);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    }
    
    fetchCredits();
  }, [isAuthenticated]);

  async function handleReview() {
    try {
      setIsLoading(true);
      setRateLimitError("");
      const data = await getCodeReview(code);
      if (data.review) {
        setReview(data.review);
        setCredits(data.credits);
      } else {
        setReview(data);
      }
    } catch (error) {
      console.error("Error getting review:", error);
      const errorMsg = error.response?.data?.message || error.message;
      if (error.response?.status === 429 || errorMsg.includes("limit") || errorMsg.includes("credit")) {
        setRateLimitError(
          errorMsg || "You have reached your daily limit. Please log in or sign up to get more reviews!"
        );
        setReview("");
        if (!isAuthenticated) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else if (error.response?.status === 401) {
        setRateLimitError("Please log in to use this feature.");
        setReview("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setReview("Error getting code review. Please try again.");
      }
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
          rateLimitError={rateLimitError}
          credits={credits}
        />
        <ReviewPanel review={review} rateLimitError={rateLimitError} credits={credits} />
      </main>
    </div>
  );
}
