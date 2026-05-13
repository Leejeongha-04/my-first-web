import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, LineChart, Timer } from "lucide-react";

export default function HomePage() {
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
        <Link href="/login">
          <Button size="lg" className="px-8 text-base font-semibold">
            로그인
          </Button>
        </Link>
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
            desc: "나만의 기록 보관소",
            icon: <Archive className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
          { 
            title: "데이터 인사이트", 
            desc: "기록에서 찾는 변화",
            icon: <LineChart className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
          { 
            title: "성장 일지", 
            desc: "함께 성장하는 여정",
            icon: <Timer className="w-8 h-8 mb-4 text-gray-600 mx-auto" />
          },
        ].map((item, idx) => (
          <Card key={idx} className="border-none bg-gray-50/50 shadow-none">
            <CardContent className="pt-6">
              {item.icon}
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


