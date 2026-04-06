import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">게시글 목록</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="block p-5 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <time className="text-xs text-gray-400 mb-1 block">{post.date}</time>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.content}
              </p>
              <div className="mt-4 flex items-center text-xs text-gray-500 font-medium">
                작성자: {post.author}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
