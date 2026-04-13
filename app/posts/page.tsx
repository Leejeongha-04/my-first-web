import Link from "next/link";
import { getPosts, type Post } from "@/lib/posts";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const posts = await getPosts();

  const filteredPosts = q
    ? posts.filter((post: Post) => post.title.toLowerCase().includes(q.toLowerCase()))
    : posts;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          글쓰기
        </Link>
      </div>

      <SearchBar />

      <div className="flex flex-col gap-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredPosts.map((post: Post) => (
            <div key={post.id} className="relative group">
              <Link href={`/posts/${post.id}`}>
                <div className="block p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <DeleteButton id={post.id} />
                  </div>
                  <p className="text-gray-600 line-clamp-1 mb-4">{post.body}</p>
                  <div className="flex items-center text-xs text-gray-500 font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      ID: {post.id} | User ID: {post.userId}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}