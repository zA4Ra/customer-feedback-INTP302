import "./globals.css";

export const metadata = {
  title: "Feedback Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white px-6 py-3 flex gap-6">
          <a href="/" className="font-semibold hover:underline">
            Submit Feedback
          </a>
          <a href="/dashboard" className="font-semibold hover:underline">
            Dashboard
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}