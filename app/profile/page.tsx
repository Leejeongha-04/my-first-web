"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, UserCircle, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setEmail(user.email ?? null);

        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading profile:", error.message, error.details);
        } else if (data) {
          setUsername(data.username || "");
        } else {
          // 프로필이 없는 경우 (예: 이전 가입자 등)
          // 닉네임 기본값을 설정하거나 유저에게 알림
          console.log("No profile found for user, will be created on first update");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin h-12 w-12 text-[#C0763C] dark:text-[#BA4E8B]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-[#2D241E] dark:text-white">개인 프로필</h1>
        <p className="text-[#8C7E6A] dark:text-[#A194A0]">회원님의 정보를 확인할 수 있습니다.</p>
      </div>
      
      <Card className="bg-white dark:bg-[#1A1425] border-2 border-[#D1C7BB] dark:border-[#BA4E8B]/20 shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#F5EFE6] to-[#E8DCC4] dark:from-[#2D1F3D] dark:to-[#1A1425] border-b-2 border-[#D1C7BB] dark:border-[#BA4E8B]/20 flex items-end justify-center pb-0">
            <div className="relative -mb-12">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#1A1425] border-4 border-[#D1C7BB] dark:border-[#BA4E8B] flex items-center justify-center overflow-hidden shadow-lg">
                    <UserCircle className="w-20 h-20 text-[#D1C7BB] dark:text-[#BA4E8B]/50" />
                </div>
            </div>
        </div>

        <CardHeader className="pt-16 text-center">
          <CardTitle className="text-xl font-bold text-[#2D241E] dark:text-white">
            {username || "익명 사용자"}
          </CardTitle>
          <p className="text-sm text-[#8C7E6A] dark:text-[#A194A0]">{email}</p>
        </CardHeader>

        <CardContent className="space-y-8 px-8 py-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2D241E] dark:text-[#A194A0]">이메일 계정</label>
              <div className="flex items-center gap-3 p-4 bg-[#FAF9F6] dark:bg-[#110C1D] rounded-xl border border-[#D1C7BB] dark:border-[#BA4E8B]/20">
                <Mail className="w-5 h-5 text-[#8C7E6A]" />
                <span className="text-sm font-medium text-[#2D241E]/70 dark:text-white/70">{email}</span>
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-[#2D241E] dark:text-[#A194A0]">
                    닉네임
                </label>
                <div className="flex items-center gap-3 p-4 bg-[#FAF9F6] dark:bg-[#110C1D] rounded-xl border border-[#D1C7BB] dark:border-[#BA4E8B]/20">
                    <User className="w-5 h-5 text-[#8C7E6A]" />
                    <span className="text-sm font-medium text-[#2D241E]/70 dark:text-white/70">{username || "익명 사용자"}</span>
                </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 py-6 border-t border-[#D1C7BB] dark:border-[#BA4E8B]/10 flex justify-end bg-[#FAF9F6]/50 dark:bg-black/20">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-2 border-[#D1C7BB] text-[#8C7E6A] hover:bg-[#F5EFE6] dark:border-[#BA4E8B]/20 dark:hover:bg-[#BA4E8B]/10 rounded-xl h-12 px-6"
          >
            돌아가기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
