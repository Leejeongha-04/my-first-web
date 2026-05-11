import Link from "next/link";
import { getPost } from "@/lib/posts-server";
import { Button } from "@/components/ui/button";

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
    post = null;
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-xl font-semibold text-gray-700">게시글을 찾을 수 없습니다.</p>
        <Link href="/posts">
          <Button variant="outline">목록으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

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
            Post #{post.id}
          </span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-500">User ID: {post.userId}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="h-1 w-20 bg-primary/20 rounded"></div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.body}
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm text-gray-500 font-medium">
          작성자: User {post.userId}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">수정</Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/5">삭제</Button>
        </div>
      </footer>
    </article>
  );
}
