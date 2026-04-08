import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
      <body className="antialiased text-gray-900 bg-white min-h-screen flex flex-col font-sans">
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl hover:text-gray-300 transition-colors">
              내 블로그
            </Link>
            <ul className="flex gap-4">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">홈</Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-gray-300 transition-colors">게시글</Link>
              </li>
              <li>
                <Link
                  href="/posts/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  새 글 쓰기
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto w-full p-6 flex-grow">
          {children}
        </main>

        <footer className="text-center p-8 text-gray-500 border-t bg-gray-50 mt-12">
          <p>© 2026 내 블로그. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

