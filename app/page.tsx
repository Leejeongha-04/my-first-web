import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, NotebookPen, Telescope, ArrowRight, Clock } from "lucide-react";
import { getPosts } from "@/lib/posts-server";

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
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse-slow delay-700" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse-slow delay-1000" />
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full blur-[1px] animate-pulse-slow delay-500" />
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

            {/* Planet Decoration - Light Mode (Current) */}
            <div className="relative pointer-events-none self-center md:self-auto block dark:hidden">
              <svg width="280" height="280" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                {/* Outer Glow/Orbit */}
                <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-[#C0763C]/30" />
                
                {/* The Main Planet - Sun-like for light mode */}
                <defs>
                  <radialGradient id="planetGradientLight" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="80%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>
                  <filter id="planetGlowLight">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                <circle cx="100" cy="100" r="52" fill="#22D3EE" opacity="0.3" filter="url(#planetGlowLight)" />
                <circle cx="100" cy="100" r="48" fill="url(#planetGradientLight)" stroke="#22D3EE" strokeWidth="1.5" />
                
                <ellipse cx="100" cy="85" rx="25" ry="8" fill="white" opacity="0.1" />
                <ellipse cx="85" cy="105" rx="20" ry="6" fill="white" opacity="0.05" />
                <ellipse cx="115" cy="115" rx="15" ry="5" fill="white" opacity="0.08" />
                
                <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px' }}>
                  <circle cx="35" cy="45" r="8" fill="#94A3B8" stroke="#475569" strokeWidth="0.5" />
                </g>
              </svg>
            </div>

            {/* Planet Decoration - Dark Mode (Based on Image) */}
            <div className="relative pointer-events-none self-center md:self-auto hidden dark:block scale-125 md:scale-150 transition-all duration-700">
              <svg width="350" height="350" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Nebula Glows */}
                  <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#31105e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#31105e" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4a1d7a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4a1d7a" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Planet Glow */}
                  <radialGradient id="darkPlanetGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0B031A" />
                    <stop offset="90%" stopColor="#1E0B3B" />
                    <stop offset="100%" stopColor="#2D1154" />
                  </radialGradient>
                </defs>

                {/* Background Hazy Ellipses (Nebulas) */}
                <ellipse cx="200" cy="200" rx="180" ry="100" fill="url(#nebula1)" className="animate-pulse-slow" style={{ transform: 'rotate(-25deg)', transformOrigin: '200px 200px' }} />
                <ellipse cx="250" cy="150" rx="140" ry="80" fill="url(#nebula2)" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <ellipse cx="150" cy="280" rx="160" ry="90" fill="url(#nebula1)" className="animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Stars */}
                <circle cx="50" cy="80" r="1.5" fill="white" opacity="0.8" className="animate-pulse" />
                <circle cx="120" cy="40" r="1" fill="white" opacity="0.6" />
                <circle cx="320" cy="110" r="1.2" fill="white" opacity="0.7" />
                <circle cx="380" cy="250" r="1" fill="white" opacity="0.5" />
                <circle cx="40" cy="300" r="1.5" fill="white" opacity="0.8" />
                <circle cx="280" cy="350" r="1" fill="white" opacity="0.6" />

                {/* Secondary Planet (Small Purple One) */}
                <g className="animate-float">
                  <circle cx="140" cy="120" r="15" fill="#3D1466" stroke="#BA4E8B" strokeWidth="0.5" />
                  <circle cx="135" cy="115" r="3" fill="#BA4E8B" opacity="0.5" />
                </g>

                {/* Main Central Planet */}
                <g className="drop-shadow-[0_0_15px_rgba(186,78,139,0.3)]">
                  <circle cx="200" cy="200" r="65" fill="url(#darkPlanetGrad)" stroke="#BA4E8B" strokeWidth="2" />
                  {/* Planet Reflective Ellipses */}
                  <ellipse cx="200" cy="170" rx="35" ry="12" fill="#BA4E8B" opacity="0.15" />
                  <ellipse cx="180" cy="210" rx="25" ry="8" fill="#BA4E8B" opacity="0.1" />
                  
                  {/* Central Bright Core */}
                  <circle cx="200" cy="200" r="4" fill="#22D3EE" className="animate-pulse">
                    <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="200" r="12" fill="#22D3EE" opacity="0.2" className="animate-pulse" />
                </g>

                {/* Smallest orbiting point or moon */}
                <circle cx="300" cy="280" r="10" fill="#2D1154" stroke="#BA4E8B" strokeWidth="0.5" className="animate-float" style={{ animationDelay: '-1.5s' }} />
              </svg>
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
            {recentPosts.map((post, idx) => (
              <Link href={`/posts/${post.id}`} key={post.id} className="max-w-[240px] mx-auto sm:mx-0">
                <Card className="group border-none overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-[#1A1625] dark:ring-1 dark:ring-white/5">
                  <div className={`h-24 bg-gradient-to-br ${cardGradients[idx % 3]} transition-transform duration-500 group-hover:scale-105`} />
                  <CardContent className="p-4 space-y-1.5">
                    <h3 className="font-bold text-[#2D241E] dark:text-white text-base line-clamp-1 group-hover:text-[#C0763C] dark:group-hover:text-[#BA4E8B] transition-colors">{post.title}</h3>
                    <p className="text-xs text-[#8C7E6A] dark:text-[#A194A0] font-medium transition-colors">
                      {new Date(post.created_at).getMonth() + 1}/{new Date(post.created_at).getDate()}
                    </p>
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


