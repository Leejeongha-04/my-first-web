import Link from "next/link";
import { getPost } from "@/lib/posts";

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
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-800 font-medium underline"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <Link
          href="/posts"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      <header className="mb-10 border-b pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span className="font-medium text-gray-900">{post.author}</span>
          <span>|</span>
          <time className="text-sm">{post.date}</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
