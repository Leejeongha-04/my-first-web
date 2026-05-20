"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Input } from "@/components/ui/input";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.push(`/posts?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [term, router, searchParams]);

  return (
    <div>
      <Input
        type="text"
        placeholder="제목으로 게시글 검색..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full h-11"
      />
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="h-11 bg-muted animate-pulse rounded-lg"></div>}>
      <SearchInput />
    </Suspense>
  );
}