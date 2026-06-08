"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 서비스에 기록할 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="rounded-full bg-destructive/10 p-4 mb-6">
        <AlertCircle className="w-12 h-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">문제가 발생했습니다.</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        페이지를 불러오는 중에 예상치 못한 오류가 발생했습니다. 아래 버튼을 눌러 다시 시도하거나 홈으로 돌아갈 수 있습니다.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          다시 시도
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            홈으로 이동
          </Button>
        </Link>
      </div>
    </div>
  );
}
