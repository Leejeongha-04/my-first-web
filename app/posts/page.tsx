import Link from "next/link";
import { getPosts, type Post } from "@/lib/posts";
import SearchBar from "./SearchBar";
import DeleteButton from "./DeleteButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-3xl mx-auto space-y-10 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">게시글 목록</h1>
          <p className="text-gray-500 mt-1">블로그의 모든 기록들을 만나보세요.</p>
        </div>
        <Link href="/posts/new">
          <Button className="w-full sm:w-auto">
            글쓰기
          </Button>
        </Link>
      </div>

      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
        <SearchBar />
      </div>

      <div className="grid gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50">
            <p className="text-gray-400">검색 결과가 없습니다.</p>
          </div>
        ) : (
          filteredPosts.map((post: Post) => (
            <Card key={post.id} className="group overflow-hidden border-gray-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <Link href={`/posts/${post.id}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </CardTitle>
                    <DeleteButton id={post.id} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex items-center gap-3">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground">
                    Author ID: {post.userId}
                  </span>
                  <span className="text-xs text-gray-400">
                    ID: {post.id}
                  </span>
                </CardFooter>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}