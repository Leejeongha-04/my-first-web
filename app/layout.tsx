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
      <body className="antialiased text-foreground bg-background min-h-screen flex flex-col font-sans">
        <nav className="sticky top-0 z-50 w-full bg-[#1a1f2e] text-white">
          <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-6">
            <Link href="/" className="font-bold text-xl hover:text-white transition-colors">
              내 블로그
            </Link>
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">홈</Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors outline-none cursor-pointer">
                    게시글 <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40 bg-[#1a1f2e] border-gray-700 text-white shadow-xl">
                    <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                      <Link href="/posts">게시글 목록</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                      <Link href="/posts/new">새 글 작성</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link href="/archive" className="text-sm font-medium text-white/80 hover:text-white transition-colors">기록보관소</Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t py-12 bg-background">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
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

