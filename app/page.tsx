"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (isMounted) setUser(user);
      } catch (error) {
        console.warn("Home auth fetching interrupted");
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (isMounted) setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:py-20 text-center space-y-8">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          반갑습니다! <br />
          나만의 <br />
          <span className="text-primary">유니버스</span>입니다.
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {user ? (
          <Button size="lg" onClick={handleSignOut} className="px-8 text-base font-semibold">
            로그아웃
          </Button>
        ) : (
          <Link href="/login">
            <Button size="lg" className="px-8 text-base font-semibold">
              로그인
            </Button>
          </Link>
        )}
        <Link href="/posts/new">
          <Button size="lg" variant="outline" className="px-8 text-base font-semibold">
            새 글 작성하기
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
        {[
          { 
            title: "아카이브", 
            icon: <Archive className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
          { 
            title: "연구실", 
            icon: <FlaskConical className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
          { 
            title: "성장 일지", 
            icon: <Timer className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
        ].map((item, idx) => (
          <Card key={idx} className="border-none bg-gray-50/50 shadow-none">
            <CardContent className="pt-6">
              {item.icon}
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


