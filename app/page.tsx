import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, NotebookPen, Telescope, ArrowRight, Clock } from "lucide-react";
import { getPosts } from "@/lib/posts-server";

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 pb-24 sm:py-32">
        {/* Deep Space Background Background */}
        <div className="absolute inset-0 z-0 bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background opacity-50 dark:opacity-100" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* Floating Stars/Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse-slow active" />
          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse-slow delay-700" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px] animate-pulse-slow delay-500" />
        </div>

        {/* Main Graphic */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-30 dark:opacity-80 scale-125 lg:scale-150 transition-all duration-1000">
            <svg 
              width="600" 
              height="600" 
              viewBox="0 0 400 400" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="dark:drop-shadow-[0_0_30px_rgba(0,150,255,0.4)] animate-float"
            >
              <defs>
                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F3FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#AD00FF" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path 
                d="M200 40L240 160L360 200L240 240L200 360L160 240L40 200L160 160L200 40Z" 
                stroke="url(#starGradient)" 
                strokeWidth="1.5" 
                className="opacity-80"
              />
              <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-30" />
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="opacity-20" />
              
              {/* Star points */}
              <circle cx="200" cy="40" r="4" fill="#00F3FF" className="animate-pulse" />
              <circle cx="360" cy="200" r="4" fill="#00F3FF" className="animate-pulse delay-75" />
              <circle cx="200" cy="360" r="4" fill="#AD00FF" className="animate-pulse delay-150" />
              <circle cx="40" cy="200" r="4" fill="#AD00FF" className="animate-pulse delay-225" />
            </svg>
          </div>
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto px-6">
          <div className="max-w-xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                생각과 기록으로 <br />
                이루어진 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5b73e1] to-[#00F3FF] dark:from-[#00F3FF] dark:to-[#AD00FF] transition-all duration-500 drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">유니버스</span>
              </h1>
              <p className="text-lg text-muted-foreground/80 font-medium max-w-md">
                탐구하고 습득하고 기록한 자료들을 보관합니다.
              </p>
            </div>
            <Link href="/posts/new">
              <Button size="lg" className="bg-[#00F3FF] hover:bg-[#00D1FF] text-[#0A0E1A] rounded-full px-10 h-14 text-lg font-bold group mt-4 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all hover:scale-105">
                새 글 작성하기
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Records Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-bold tracking-tight">최근 기록</h2>
            <Link href="/posts" className="text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
              더 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recentPosts.map((post, idx) => (
              <Card key={post.id} className="group relative border-none bg-card/40 dark:bg-white/5 backdrop-blur-xl transition-all overflow-hidden rounded-2xl hover:-translate-y-2 ring-1 ring-white/10 dark:ring-white/5 hover:ring-[#00F3FF]/50 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F3FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link href={`/posts/${post.id}`}>
                  <div className="aspect-[16/10] w-full bg-slate-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#00F3FF] text-[#0A0E1A] text-[10px] font-black rounded-full uppercase tracking-tighter">
                        LOG
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="text-xl font-black leading-tight group-hover:text-[#00F3FF] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground/70 text-sm line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-muted-foreground/50 border-t border-white/5">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
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
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "보관소", desc: "완성된 글과 정리된 자료를 보관하는 공간", icon: Archive, slug: "보관소", color: "from-blue-500/20 to-cyan-500/20", border: "group-hover:ring-blue-500" },
              { title: "연구실", desc: "실험하고 개발한 과정과 결과를 기록", icon: FlaskConical, slug: "연구실", color: "from-purple-500/20 to-pink-500/20", border: "group-hover:ring-purple-500" },
              { title: "기록실", desc: "회고와 생각, 일상 기록을 남기는 공간", icon: NotebookPen, slug: "기록실", color: "from-orange-500/20 to-yellow-500/20", border: "group-hover:ring-orange-500" },
              { title: "관측소", desc: "발견한 것들과 아이디어 파편을 모아두는 공간", icon: Telescope, slug: "관측소", color: "from-green-500/20 to-emerald-500/20", border: "group-hover:ring-green-500" },
            ].map((item, idx) => (
              <Link href={`/posts?cat=${item.slug}`} key={idx} className="block group">
                <Card className={`relative border-none bg-card/40 dark:bg-white/5 backdrop-blur-xl h-full transition-all duration-500 rounded-2xl ring-1 ring-white/10 dark:ring-white/5 ${item.border} hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] hover:-translate-y-1`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl`} />
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="p-4 bg-background/50 dark:bg-white/10 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                      <item.icon className="w-6 h-6 text-foreground/80 dark:text-white group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-1">
                        <h4 className="font-black text-base tracking-tighter uppercase">{item.title}</h4>
                      </div>
                      <p className="text-[11px] text-muted-foreground/70 leading-relaxed px-1 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-[100px] pointer-events-none" />
        <div className="flex justify-center mt-12 mb-8 opacity-20">
          <div className="w-1 h-1 bg-white rounded-full mx-1 shadow-[0_0_10px_white]" />
          <div className="w-1 h-1 bg-white rounded-full mx-1 shadow-[0_0_10px_white] opacity-50" />
          <div className="w-1 h-1 bg-white rounded-full mx-1 shadow-[0_0_10px_white] opacity-25" />
        </div>
      </section>
    </div>
  );
}


