"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createComment } from "@/lib/posts-client";

interface CommentFormProps {
  postId: string;
  userId: string;
}

export default function CommentForm({ postId, userId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createComment(postId, userId, content);
      setContent("");
      router.refresh();
    } catch (error) {
      alert("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-0">
      <div className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="w-full min-h-[100px] p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
          disabled={isSubmitting}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "작성 중..." : "댓글 작성"}
          </Button>
        </div>
      </div>
    </form>
  );
}
