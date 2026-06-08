"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (isMounted) setUser(user);
      } catch (error) {
        console.warn("Auth fetching interrupted");
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (isMounted) setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/profile"
          className="flex items-center gap-2 text-sm text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] transition-colors group"
        >
          <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-medium">{user.email?.split("@")[0]}님</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] hover:bg-transparent flex items-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.push("/login")}
      className="text-[#8C7E6A] dark:text-[#A194A0] hover:text-[#C0763C] dark:hover:text-[#BA4E8B] hover:bg-transparent font-semibold transition-colors"
    >
      로그인
    </Button>
  );
}
