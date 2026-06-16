"use client";
import { useEffect, useState } from "react";

const sentimentConfig = {
  positive: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  negative: { color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
  neutral: { color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  mixed: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
};

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/get-feedback");
      const data = await res.json();
      if (data.success) setEntries(data.entries);
      setLoading(false);
    }
    loadData();
  }, []);

  const counts = {
    positive: entries.filter((e) => e.sentiment === "positive").length,
    negative: entries.filter((e) => e.sentiment === "negative").length,
    neutral: entries.filter((e) => e.sentiment === "neutral").length,
    mixed: entries.filter((e) => e.sentiment === "mixed").length,
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-semibold tracking-tight mb-3">
          Sentiment Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          A live overview of customer feedback sentiment.
        </p>
      </div>

      {/* Counts */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl mb-12">
        {Object.entries(counts).map(([label, count]) => {
          const config = sentimentConfig[label];
          return (
            <div key={label} className={`border rounded-3xl p-6 text-center ${config.bg}`}>
              <p className={`text-5xl font-semibold mb-1 ${config.color}`}>{count}</p>
              <p className="text-gray-400 text-sm capitalize">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div className="w-full max-w-xl">
        <h2 className="text-lg font-medium text-gray-300 mb-4">
          Recent Submissions
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-500 text-center">No submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => {
              const config = sentimentConfig[entry.sentiment];
              return (
                <div key={entry.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-300 text-sm">{entry.text}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`ml-4 shrink-0 text-xs font-medium px-3 py-1 rounded-full border capitalize ${config.bg} ${config.color}`}>
                    {entry.sentiment}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-12 text-gray-600 text-sm">Powered by Azure AI Language</p>
    </main>
  );
}