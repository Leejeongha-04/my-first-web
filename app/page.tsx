import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, NotebookPen, Telescope, ArrowRight, Clock, Eye, Heart } from "lucide-react";
import { getPosts } from "@/lib/posts-server";
import Image from "next/image";
import UniverseParallax from "@/components/UniverseParallax";

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);

  const cardGradients = [
    "from-[#FFE4A1] to-[#FFCF71] dark:from-[#7C3AED] dark:to-[#DB2777]",
    "from-[#FFD8C4] to-[#FFB38E] dark:from-[#6D28D9] dark:to-[#BE185D]",
    "from-[#FFCBB4] to-[#FF9068] dark:from-[#581C87] dark:to-[#9D174D]",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] dark:bg-[#110C1D] transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-4 sm:pt-12 sm:pb-6">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-96 h-96 bg-[#FDEBD0] dark:bg-[#BA4E8B]/10 rounded-full blur-3xl opacity-50 transition-colors" />
        <div className="absolute top-1/4 left-[5%] w-48 h-48 bg-[#FEF5E7] dark:bg-[#7C3AED]/10 rounded-full blur-2xl opacity-40 transition-colors" />
        
        {/* Floating Stars/Particles (Dark Mode Only) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-0 dark:opacity-100 transition-opacity">
          {/* Main scattered stars */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse-slow" />
          <div className="absolute top-[15%] left-[60%] w-0.5 h-0.5 bg-white rounded-full animate-pulse-slow delay-300" />
          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse-slow delay-700" />
          <div className="absolute top-[45%] left-[85%] w-1 h-1 bg-blue-200 rounded-full animate-pulse-slow delay-200" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-200 rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute top-[70%] left-[15%] w-0.5 h-0.5 bg-white rounded-full animate-pulse-slow delay-100" />
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full blur-[1px] animate-pulse-slow delay-500" />
          <div className="absolute bottom-[10%] left-[40%] w-1 h-1 bg-white rounded-full animate-pulse-slow delay-900" />
          <div className="absolute top-[80%] right-[10%] w-0.5 h-0.5 bg-pink-100 rounded-full animate-pulse-slow delay-400" />
          
          {/* Tiny background dust stars */}
          <div className="absolute top-10 left-10 w-px h-px bg-white opacity-40" />
          <div className="absolute top-40 right-20 w-px h-px bg-white opacity-30" />
          <div className="absolute bottom-20 left-1/2 w-px h-px bg-white opacity-50" />
          <div className="absolute top-3/4 left-1/4 w-px h-px bg-white opacity-30" />
          <div className="absolute top-1/2 right-1/2 w-px h-px bg-white opacity-20" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-xl space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#2D241E] dark:text-white leading-[1.15] transition-colors">
                  생각과 기록으로 <br />
                  이루어진 <span className="text-[#C0763C] dark:text-[#BA4E8B] transition-colors">유니버스</span>
                </h1>
                <p className="text-xl text-[#8C7E6A] dark:text-[#A194A0] font-medium max-w-md transition-colors">
                  탐구하고 습득하고 기록한 자료들을 보관합니다.
                </p>
              </div>
              <Link href="/posts/new">
                <Button size="lg" className="bg-[#C0763C] hover:bg-[#A6612D] dark:bg-[#BA4E8B] dark:hover:bg-[#9F3D74] text-white rounded-xl px-8 h-14 text-lg font-bold group mt-4 transition-all hover:scale-105 shadow-lg shadow-[#C0763C]/20 dark:shadow-[#BA4E8B]/20">
                  새 글 작성하기
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Planet Decoration with Parallax */}
            <div className="self-center md:self-auto">
              <UniverseParallax />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Records Section */}
      <section className="py-4 relative">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#2D241E] dark:text-white transition-colors">최근 기록</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {recentPosts.map((post, idx) => {
              // 이미지 URL 배열 처리
              const safeImageUrls = Array.isArray(post.image_urls) 
                ? post.image_urls 
                : typeof post.image_urls === 'string' 
                  ? (post.image_urls as string).replace(/[{}]/g, '').split(',').filter(Boolean)
                  : [];
              const thumbnail = safeImageUrls[0] || post.image_url;

              return (
                <Link href={`/posts/${post.id}`} key={post.id} className="max-w-[300px] w-full mx-auto sm:mx-0">
                  <Card className="group border-none overflow-hidden rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-[#1E1A2B] ring-1 ring-black/5 dark:ring-white/10 hover:ring-primary/20 dark:hover:ring-[#BA4E8B]/40 h-full flex flex-col">
                    <div className="relative h-36 overflow-hidden">
                      {thumbnail ? (
                        <>
                          <Image
                            src={thumbnail}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {/* Dark mode overlay for better contrast */}
                          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:opacity-0 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${cardGradients[idx % 3]} transition-transform duration-500 group-hover:scale-105 opacity-90 dark:opacity-80`} />
                      )}
                    </div>
                    <CardContent className="p-5 space-y-2.5 flex-grow bg-white dark:bg-[#1E1A2B]">
                      <h3 className="font-bold text-[#2D241E] dark:text-gray-100 text-base line-clamp-2 group-hover:text-[#C0763C] dark:group-hover:text-[#BA4E8B] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[#8C7E6A] dark:text-[#A194A0]" />
                          <p className="text-xs text-[#8C7E6A] dark:text-[#A194A0] font-medium transition-colors">
                            {new Date(post.created_at).toLocaleDateString("ko-KR", {
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-[#8C7E6A] dark:text-[#A194A0]" />
                            <span className="text-[10px] text-[#8C7E6A] dark:text-[#A194A0] font-medium">
                              {post.views || 0}
                            </span>
                          </div>
                          <div className={`flex items-center gap-1 ${post.is_liked ? "text-red-500" : "text-[#8C7E6A] dark:text-[#A194A0]"}`}>
                            <Heart className={`w-3 h-3 ${post.is_liked ? "fill-current" : ""}`} />
                            <span className="text-[10px] font-medium">
                              {post.likes_count || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


