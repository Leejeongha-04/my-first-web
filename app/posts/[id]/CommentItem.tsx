"use client";

import { Comment, deleteComment } from "@/lib/posts-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
}

export default function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const isOwner = currentUserId === comment.user_id;

  const handleDelete = async () => {
    if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

    setIsDeleting(true);
    try {
      await deleteComment(comment.id);
      router.refresh();
    } catch (error) {
      alert("댓글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-6 first:pt-0 border-b last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold uppercase overflow-hidden">
            {comment.author?.avatar_url ? (
              <img src={comment.author.avatar_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              comment.author?.username?.[0] || "?"
            )}
          </div>
          <div>
            <div className="text-sm font-semibold">{comment.author?.username || "익명"}</div>
            <div className="text-[11px] text-muted-foreground">
              {new Date(comment.created_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive h-8 px-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </Button>
        )}
      </div>
      <div className="pl-10 text-sm leading-relaxed whitespace-pre-wrap">
        {comment.content}
      </div>
    </div>
  );
}
