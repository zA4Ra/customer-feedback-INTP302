import "./globals.css";

export const metadata = {
  title: "Feedback Analyzer",
  description: "Understand the sentiment behind every message.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <nav className="fixed top-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-xl border-b border-white/8 px-8 py-0 flex items-center justify-between h-14">
          <span className="text-white font-semibold text-sm tracking-tight select-none">
            Feedback <span className="text-indigo-400">AI</span>
          </span>
          <div className="flex gap-1">
            <a href="/" className="text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-all px-4 py-1.5 rounded-xl">
              Submit
            </a>
            <a href="/dashboard" className="text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-all px-4 py-1.5 rounded-xl">
              Dashboard
            </a>
          </div>
        </nav>
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}