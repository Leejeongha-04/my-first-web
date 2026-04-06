import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "내 블로그",
  description: "Next.js 16으로 만든 내 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased text-gray-900 bg-white min-h-screen flex flex-col">
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto font-bold text-xl">
            내 블로그
          </div>
        </nav>
        <main className="max-w-4xl mx-auto p-6 flex-grow">
          {children}
        </main>
        <footer className="text-center p-6 text-gray-500 border-t">
          © 2026 내 블로그
        </footer>
      </body>
    </html>
  );
}

