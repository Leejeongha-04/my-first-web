"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

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
    <div className="mb-6">
      <input
        type="text"
        placeholder="제목으로 게시글 검색..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="mb-6 h-10 bg-gray-100 animate-pulse rounded-lg"></div>}>
      <SearchInput />
    </Suspense>
  );
}