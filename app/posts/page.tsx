import Link from "next/link";
import { getPosts, type Post } from "@/lib/posts-server";
import SearchBar from "./SearchBar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{ q?: string; cat?: string }>;
};

export default async function PostsPage({ searchParams }: Props) {
  const { q, cat } = await searchParams;
  const posts = await getPosts(cat);

  const filteredPosts = q
    ? posts.filter((post: Post) => post.title.toLowerCase().includes(q.toLowerCase()))
    : posts;

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10 px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {cat ? `${cat} 목록` : "게시글 목록"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {cat ? `${cat}에 저장된 기록들을 확인해 보세요.` : "유니버스에 남겨진 모든 발자취들을 확인해 보세요."}
          </p>
        </div>
        <Link href={`/posts/new${cat ? `?cat=${cat}` : ""}`}>
          <Button className="w-full sm:w-auto bg-primary text-primary-foreground">
            새 글 작성
          </Button>
        </Link>
      </div>

      <div className="bg-muted/50 p-6 rounded-xl border border-border">
        <SearchBar />
      </div>

      <div className="grid gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground">일치하는 기록을 찾을 수 없습니다.</p>
          </div>
        ) : (
          filteredPosts.map((post: Post) => (
            <Card key={post.id} className="group overflow-hidden border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <Link href={`/posts/${post.id}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {post.author?.username || "익명"}
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
