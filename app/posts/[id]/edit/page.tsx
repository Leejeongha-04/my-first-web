"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getPost } from "@/lib/posts-server"; // 💡 주의: 클라이언트에서 사용 시 에러 날 수 있으므로 posts-client가 나음
import { updatePost } from "@/lib/posts-client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [postId, setPostId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. 초기 데이터 및 유저 세션 로드
  useEffect(() => {
    const init = async () => {
      const { id } = await params;
      setPostId(id);

      const { data: { user } } = await supabase.auth.getUser();
      const { data: post, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!user || user.id !== post?.user_id) {
        // 실제 보안은 Ch11 RLS에서 처리되나, UX 차원에서 접근 제한
        alert("권한이 없습니다.");
        router.push(`/posts/${id}`);
        return;
      }

      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setUser(user);
      }
      setIsLoading(false);
    };
    init();
  }, [params, router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postId) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await updatePost(postId, { title, content });
      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message || "수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccess(false);
    router.push(`/posts/${postId}`);
    router.refresh();
  };

  if (isLoading) return <div className="flex justify-center py-20">로딩 중...</div>;

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href={`/posts/${postId}`} className="text-sm text-gray-500 hover:text-gray-700">
          ← 상세 페이지로 돌아가기
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">게시글 수정</CardTitle>
          <CardDescription>
            내용을 수정합니다. 실제 데이터 보안은 Ch11 RLS에서 완성됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive font-bold">{error}</p>}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "수정 중..." : "수정 완료"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 성공 팝업 */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>알림</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-lg font-medium">
            게시글을 수정 완료했습니다!
          </div>
          <DialogFooter>
            <Button onClick={handleSuccessConfirm} className="w-full">
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
