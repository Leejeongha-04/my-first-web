"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { updatePost, uploadImage } from "@/lib/posts-client";
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
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = createClient();
  
  const [postId, setPostId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("보관소");
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
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
        setCategory(post.category || "보관소");
        
        let urls: string[] = [];
        if (post.image_urls && post.image_urls.length > 0) {
          urls = post.image_urls;
        } else if (post.image_url) {
          urls = [post.image_url];
        }
        setExistingImageUrls(urls);
        setUser(user);
      }
      setIsLoading(false);
    };
    init();
  }, [params, router, supabase]);

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

      if (validFiles.length + newImageFiles.length + existingImageUrls.length > 5) {
        setError("이미지는 최대 5장까지 가능합니다.");
        return;
      }

      setNewImageFiles(prev => [...prev, ...validFiles]);
      
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postId) return;

    setIsSubmitting(true);
    setError(null);
    try {
      // 새 파일 업로드
      const uploadedUrls = await Promise.all(
        newImageFiles.map(file => uploadImage(file))
      );

      const finalImageUrls = [...existingImageUrls, ...uploadedUrls];

      await updatePost(postId, { 
        title, 
        content, 
        category, 
        image_urls: finalImageUrls
      });
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
        <Link href={`/posts/${postId}`} className="text-sm text-muted-foreground hover:text-foreground">
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
              <label htmlFor="title" className="block text-sm font-medium mb-1">제목</label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                      disabled={existingImageUrls.length + newImageFiles.length >= 5}
                    />
                  </label>

                  {/* 기존 이미지 */}
                  {existingImageUrls.map((url, index) => (
                    <div key={`existing-${index}`} className="relative w-24 h-24 group">
                      <Image
                        src={url}
                        alt={`Existing ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* 새 이미지 미리보기 */}
                  {newImagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative w-24 h-24 group">
                      <Image
                        src={preview}
                        alt={`New Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-lg ring-2 ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  * 최대 5장 가능하며 개당 5MB 이하입니다. 파란색 테두리는 새 이미지입니다.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">내용</label>
              <textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm bg-background text-foreground"
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
