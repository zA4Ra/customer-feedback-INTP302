"use client";
import { useState } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!feedback.trim()) return;
    setLoading(true);

    // Temporary fake result -replace this with real AI later
    setTimeout(() => {
      setResult({
        sentiment: "positive",
        keyPhrases: ["great service", "fast delivery"],
      });
      setLoading(false);
    }, 1000);
  }

  return (
    <main className="max-w-xl mx-auto mt-16 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        Customer Feedback
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Submit your feedback and see how it feels
      </p>

      <textarea
        className="w-full border rounded-lg p-3 text-gray-800 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Submit Feedback"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold text-lg">
            Sentiment:{" "}
            <span className="text-green-600 capitalize">{result.sentiment}</span>
          </p>
          <p className="mt-2 text-gray-600">
            Key Phrases: {result.keyPhrases.join(", ")}
          </p>
        </div>
      )}
    </main>
  );
}