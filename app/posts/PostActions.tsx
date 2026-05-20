"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/posts-client";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  postId: string;
};

export default function PostActions({ postId }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deletePost(postId);
      // 삭제 성공 후 성공 팝업 표시를 위해 상태 변경
      setOpen(false);
      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message || "삭제 중 오류가 발생했습니다.");
      setIsDeleting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccess(false);
    router.push("/posts");
    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  return (
    <div className="flex gap-2">
      <Link href={`/posts/${postId}/edit`}>
        <Button variant="outline" size="sm">
          수정
        </Button>
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/5">
            삭제
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시글 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              {/* 실제 보안은 Ch11 RLS에서 처리됩니다. */}
            </DialogDescription>
          </DialogHeader>
          {error && <p className="text-sm text-destructive font-bold">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "삭제 중..." : "삭제 확정"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 성공 팝업 */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>알림</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-lg font-medium">
            게시글을 삭제했습니다!
          </div>
          <DialogFooter>
            <Button onClick={handleSuccessConfirm} className="w-full">
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
