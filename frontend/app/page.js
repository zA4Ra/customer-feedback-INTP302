"use client";
import { useState } from "react";

const sentimentConfig = {
  positive: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", label: "Positive" },
  negative: { color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", label: "Negative" },
  neutral: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20", label: "Neutral" },
  mixed: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", label: "Mixed" },
};

export default function Home() {
  const [feedback, setFeedback] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!feedback.trim()) return;
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: feedback }),
    });

    const data = await response.json();

    if (data.success) {
      setResult(data.result);

      await fetch("/api/save-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: feedback,
          sentiment: data.result.sentiment,
          confidence: data.result.confidence,
          keyPhrases: data.result.keyPhrases,
        }),
      });
    } else {
      alert("Something went wrong. Please try again.");
    }

    setLoading(false); // ← this was missing
  } // ← handleSubmit ends here

  const config = result ? sentimentConfig[result.sentiment] : null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">

      <div className="text-center mb-12">
        <h1 className="text-5xl font-semibold tracking-tight mb-3">
          Feedback Analyzer
        </h1>
        <p className="text-gray-400 text-lg">
          Understand the sentiment behind every message.
        </p>
      </div>

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">

        <label className="block text-sm text-gray-400 mb-2 ml-1">
          Your feedback
        </label>
        <textarea
          className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 resize-none h-36 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !feedback.trim()}
          className="mt-4 w-full bg-white text-black font-medium py-3 rounded-2xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {result && config && (
          <div className={`mt-6 border rounded-2xl p-5 ${config.bg}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Sentiment</span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full border ${config.bg} ${config.color}`}>
                {config.label}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Confidence</span>
              <span className="text-white text-sm font-medium">
                {(result.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
              <div
                className={`h-1.5 rounded-full ${config.color.replace("text", "bg")}`}
                style={{ width: `${(result.confidence * 100).toFixed(0)}%` }}
              />
            </div>

            <div>
              <span className="text-gray-400 text-sm block mb-2">Key Phrases</span>
              <div className="flex flex-wrap gap-2">
                {result.keyPhrases.map((phrase, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/10"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-gray-600 text-sm">
        Powered by Azure AI Language
      </p>
    </main>
  );
}