import "./globals.css";

export const metadata = {
  title: "Feedback Analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <nav className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex gap-8">
          <a href="/" className="text-sm text-gray-300 hover:text-white transition">
            Submit Feedback
          </a>
          <a href="/dashboard" className="text-sm text-gray-300 hover:text-white transition">
            Dashboard
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}