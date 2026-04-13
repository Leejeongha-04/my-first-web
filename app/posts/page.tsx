"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPosts, type Post } from "@/lib/posts";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (term: string) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  if (loading) return <div>로딩 중...</div>;

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

      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-col gap-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="relative group">
            <Link href={`/posts/${post.id}`}>
              <div className="block p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <DeleteButton id={post.id} onDelete={handleDelete} />
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
        ))}
      </div>
    </div>
  );
}


