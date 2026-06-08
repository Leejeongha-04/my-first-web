import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { Sparkles, ChevronDown } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AuthProvider } from "@/contexts/AuthContext";

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
    <html lang="ko" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body className="antialiased text-[#2D241E] dark:text-white bg-[#FAF9F6] dark:bg-[#110C1D] min-h-screen flex flex-col font-sans transition-colors duration-300">
        <AuthProvider>
          <nav className="sticky top-0 z-50 w-full bg-[#FAF9F6]/95 dark:bg-[#110C1D]/95 backdrop-blur-md border-b-2 border-[#D1C7BB] dark:border-[#BA4E8B]/30 shadow-sm transition-all">
            <div className="max-w-4xl mx-auto flex h-20 items-center justify-between px-6">
              <Link href="/" className="font-bold text-2xl text-[#2D241E] dark:text-white hover:text-[#C0763C] dark:hover:text-[#BA4E8B] transition-colors">
                내 블로그
              </Link>
              <div className="flex items-center gap-10">
                <ul className="flex items-center gap-8">
                  <li>
                    <Link href="/" className="text-sm font-semibold text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] transition-colors">홈</Link>
                  </li>
                  <li>
                    <Link href="/posts" className="text-sm font-semibold text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] transition-colors">게시글</Link>
                  </li>
                  <li>
                    <Link href="/archive" className="text-sm font-semibold text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] transition-colors">아카이브</Link>
                  </li>
                </ul>
                <div className="flex items-center gap-4">
                  <AuthButton />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow">
            {children}
          </main>
        </AuthProvider>

        <footer className="border-t border-[#E5E5E5] dark:border-white/5 py-8 bg-[#FAF9F6] dark:bg-[#110C1D] transition-colors">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-sm text-[#8C7E6A] dark:text-[#A194A0] font-medium">
            <p>© 2026 내 블로그</p>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-rss"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

