import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">게시글 목록</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="block p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-white group">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400 whitespace-nowrap ml-4">{post.date}</time>
              </div>
              <p className="text-gray-600 line-clamp-1 mb-4">
                {post.content}
              </p>
              <div className="flex items-center text-xs text-gray-500 font-medium">
                <span className="bg-gray-100 px-2 py-1 rounded">작성자: {post.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
