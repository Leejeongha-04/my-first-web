"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toggleLike } from "@/lib/posts-client";

interface LikeButtonProps {
  postId: string;
  userId?: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
}

export default function LikeButton({
  postId,
  userId,
  initialLikesCount,
  initialIsLiked,
}: LikeButtonProps) {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleLike = async () => {
    if (!userId) {
      alert("좋아요를 누르려면 로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    // 낙관적 업데이트
    const nextIsLiked = !isLiked;
    setIsLiked(nextIsLiked);
    setLikesCount((prev) => (nextIsLiked ? prev + 1 : prev - 1));

    try {
      await toggleLike(postId, userId, isLiked);
      router.refresh();
    } catch (error: any) {
      // 에러 발생 시 원래 상태로 복구
      setIsLiked(isLiked);
      setLikesCount(likesCount);
      alert(error.message || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleToggleLike}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-full px-6 transition-all duration-300 ${
        isLiked 
          ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600" 
          : "hover:border-red-200 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      <span className="font-bold">{likesCount}</span>
    </Button>
  );
}
