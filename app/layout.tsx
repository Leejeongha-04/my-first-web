import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { Sparkles } from "lucide-react";
import AuthButton from "@/components/AuthButton";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="antialiased text-gray-900 bg-white min-h-screen flex flex-col font-sans">
        <nav className="bg-[#1a1f2e] text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl hover:text-gray-300 transition-colors">
              내 블로그
            </Link>
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">홈</Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">게시글</Link>
              </li>
              <li>
                <Link
                  href="/posts/new"
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  새 글
                  <Sparkles className="w-3.5 h-3.5 fill-white/20" />
                </Link>
              </li>
              <li className="border-l border-gray-700 pl-6 ml-2">
                <AuthButton />
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

