import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, NotebookPen, Telescope, ArrowRight, Clock } from "lucide-react";
import { getPosts } from "@/lib/posts-server";

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 pb-24 sm:py-32">
        {/* Background Mesh/Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-[60%] top-1/2 -translate-y-1/2 opacity-20 dark:opacity-40">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 100L250 200L350 250L250 300L200 400L150 300L50 250L150 200L200 100Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="200" cy="200" r="2" fill="currentColor" />
              <circle cx="100" cy="150" r="1.5" fill="currentColor" />
              <circle cx="300" cy="300" r="1.5" fill="currentColor" />
              <circle cx="150" cy="350" r="1" fill="currentColor" />
              <circle cx="350" cy="150" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto px-6">
          <div className="max-w-xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-tight">
                생각과 기록으로 <br />
                이루어진 <span className="text-[#5b73e1]">유니버스</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                탐구하고 습득하고 기록한 자료들을 보관합니다.
              </p>
            </div>
            <Link href="/posts">
              <Button size="lg" className="bg-[#5b73e1] hover:bg-[#4a5fc1] text-white rounded-md px-8 h-12 text-base font-semibold group mt-4">
                최근 기록 보기
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Records Section */}
      <section className="py-20 bg-background border-t">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold tracking-tight">최근 기록</h2>
            <Link href="/posts" className="text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-1">
              더 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group border-none shadow-sm hover:shadow-md transition-all overflow-hidden bg-card">
                <Link href={`/posts/${post.id}`}>
                  <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] font-bold rounded-full text-foreground uppercase tracking-wider">
                        기록
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="pt-4 flex items-center justify-end text-[11px] font-medium text-muted-foreground border-t">
                      <span>{new Date(post.created_at).toLocaleDateString().replace(/\. /g, '.').replace(/\.$/, '')}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
            {recentPosts.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
                <p className="text-muted-foreground">아직 작성된 기록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-20 bg-background border-t pb-32">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "보관소", desc: "완성된 글과 정리된 자료를 보관하는 공간", icon: Archive, slug: "보관소" },
              { title: "연구실", desc: "실험하고 개발한 과정과 결과를 기록", icon: FlaskConical, slug: "연구실" },
              { title: "기록실", desc: "회고와 생각, 일상 기록을 남기는 공간", icon: NotebookPen, slug: "기록실" },
              { title: "관측소", desc: "발견한 것들과 아이디어 파편을 모아두는 공간", icon: Telescope, slug: "관측소" },
            ].map((item, idx) => (
              <Link href={`/posts?cat=${item.slug}`} key={idx} className="block">
                <Card className="border-none bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-pointer shadow-none h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-background rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-snug px-2">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


