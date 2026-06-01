import Link from "next/link";
import { getPost } from "@/lib/posts-server";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostActions from "../PostActions";
import Image from "next/image";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LikeButton from "./LikeButton";
import { Eye } from "lucide-react";

// ... (중략)

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // 데이터베이스 타입 캐시 지연으로 인해 배열이 문자열로 올 경우 처리
  const safeImageUrls = Array.isArray(post.image_urls) 
    ? post.image_urls 
    : typeof post.image_urls === 'string' 
      ? (post.image_urls as string).replace(/[{}]/g, '').split(',').filter(Boolean)
      : [];

  // Ch8/Ch10 기준: 서버 컴포넌트에서 세션 확인
  // 주의: UI 분기일 뿐이며 실제 보안은 Ch11 RLS에서 처리됩니다.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post.user_id;

  return (
    <article className="max-w-2xl mx-auto py-12 px-4 sm:px-0">
      <div className="mb-12">
        <Link href="/posts">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            ← 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
            Post #{post.id.slice(0, 8)}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-sm text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="w-4 h-4 text-muted-foreground/60" />
            <span>{post.views || 0} views</span>
          </div>
        </div>
        <div className="flex justify-between items-start gap-4 mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>
          {isAuthor && post.id && <PostActions postId={post.id} />}
        </div>
        <div className="h-1 w-20 bg-primary/20 rounded"></div>
      </header>

      {safeImageUrls.length > 0 ? (
        <div className="mb-12 space-y-4">
          {safeImageUrls.map((url, index) => (
            <div key={index} className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
              <Image
                src={url}
                alt={`${post.title} - ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      ) : post.image_url ? (
        <div className="mb-12 relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap min-h-[200px]">
        {post.content}
      </div>

      <div className="mt-12 flex justify-center">
        <LikeButton 
          postId={post.id} 
          userId={user?.id} 
          initialLikesCount={post.likes_count} 
          initialIsLiked={post.is_liked}
        />
      </div>

      <section className="mt-20 pt-10 border-t border-border">
        <CommentList postId={id} />
        
        <div className="mt-10 pt-10 border-t">
          <h4 className="text-sm font-semibold mb-4">댓글 남기기</h4>
          {user ? (
            <CommentForm postId={id} userId={user.id} />
          ) : (
            <div className="bg-muted p-6 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-4">
                댓글을 작성하려면 로그인이 필요합니다.
              </p>
              <Link href="/login">
                <Button variant="outline" size="sm">로그인하러 가기</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-16 pt-8 border-t border-border flex flex-col items-center gap-8">
        <div className="w-full flex justify-between items-center text-sm text-muted-foreground font-medium">
          작성자: {post.author?.username || "익명"}
        </div>
        
        <div className="flex justify-center w-full">
          <Link href="/posts">
            <Button 
              variant="default" 
              className="px-12 py-7 rounded-2xl hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-primary/20 bg-primary text-primary-foreground"
            >
              목록
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  );
}



