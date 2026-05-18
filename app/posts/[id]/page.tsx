import Link from "next/link";
import { getPost } from "@/lib/posts-server";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostActions from "../PostActions";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Ch8/Ch10 기준: 서버 컴포넌트에서 세션 확인
  // 주의: UI 분기일 뿐이며 실제 보안은 Ch11 RLS에서 처리됩니다.
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthor = user && user.id === post.user_id;

  return (
    <article className="max-w-2xl mx-auto py-12 px-4 sm:px-0">
      <div className="mb-12">
        <Link href="/posts">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 -ml-2">
            ← 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
            Post #{post.id.slice(0, 8)}
          </span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-start gap-4 mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          {isAuthor && <PostActions postId={post.id} />}
        </div>
        <div className="h-1 w-20 bg-primary/20 rounded"></div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[200px]">
        {post.content}
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500 font-medium">
          작성자: {post.profiles?.username || "익명"}
        </div>
      </footer>
    </article>
  );
}



