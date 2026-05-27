"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { createPost, uploadImage } from "@/lib/posts-client";
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
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

function NewPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const initialCategory = searchParams.get("cat") || "보관소";
  
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name}은(는) 5MB를 초과하여 제외되었습니다.`);
          return false;
        }
        return true;
      });

      if (validFiles.length + imageFiles.length > 5) {
        setError("이미지는 최대 5장까지 업로드 가능합니다.");
        return;
      }

      setImageFiles(prev => [...prev, ...validFiles]);
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

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
      const image_urls = await Promise.all(
        imageFiles.map(file => uploadImage(file))
      );

      const newPost = await createPost({
        title: title.trim(),
        content: content.trim(),
        user_id: user.id,
        category: category,
        image_urls: image_urls
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
              <label className="block text-sm font-medium mb-2">이미지 (최대 5장)</label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <ImagePlus className="w-6 h-6 text-muted-foreground mb-1" />
                      <p className="text-[10px] text-muted-foreground">이미지 추가</p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={imageFiles.length >= 5}
                    />
                  </label>

                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-24 h-24 group">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  * 최대 5장, 개당 5MB 이하의 이미지 파일을 업로드할 수 있습니다.
                </p>
              </div>
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


