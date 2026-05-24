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
        <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
          <div className="max-w-4xl mx-auto flex h-14 items-center justify-between px-6">
            <Link href="/" className="font-bold text-xl hover:text-primary transition-colors">
              내 블로그
            </Link>
            <div className="flex items-center gap-8">
              <ul className="flex items-center gap-6">
                <li>
                  <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">홈</Link>
                </li>
                <li>
                  <Link href="/posts" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">게시글</Link>
                </li>
                <li>
                  <Link href="/archive" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">아카이브</Link>
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

        <footer className="border-t py-6 bg-background">
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

