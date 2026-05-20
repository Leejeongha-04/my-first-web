"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { createPost } from "@/lib/posts-client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function NewPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const initialCategory = searchParams.get("cat") || "보관소";
  
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newPostId, setNewPostId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setIsCheckingAuth(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const newPost = await createPost({
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
        category: category
      });
      setNewPostId(newPost.id);
      setShowSuccessDialog(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "게시글 저장에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    if (newPostId) {
      router.push(`/posts/${newPostId}`);
    }
  };

  if (isCheckingAuth) {
    return <div className="flex justify-center py-20">인증 확인 중...</div>;
  }

  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>게시 완료</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-lg font-medium">글이 성공적으로 게시되었습니다!</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleCloseDialog}>확인</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mb-8">
        <Link
          href="/posts"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">새 게시글 작성</CardTitle>
          <CardDescription>나만의 기록을 남겨보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                카테고리
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm bg-background text-foreground"
              >
                <option value="보관소">보관소</option>
                <option value="연구실">연구실</option>
                <option value="기록실">기록실</option>
                <option value="관측소">관측소</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1"
              >
                제목
              </label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1"
              >
                내용
              </label>
              <textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm bg-background text-foreground"
                placeholder="내용을 입력하세요"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive font-bold">{error}</p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/posts")}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "저장 중..." : "저장하기"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default function NewPostPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">로딩 중...</div>}>
      <NewPostForm />
    </Suspense>
  );
}


