import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:py-20 text-center space-y-8">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          반갑습니다! <br />
          나만의 기록 <br />
          <span className="text-primary">스페이스</span>입니다.
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 leading-relaxed">
          Next.js 16과 Tailwind CSS 4로 제작된 깔끔하고 현대적인 블로그입니다. <br className="hidden sm:block" />
          이곳에서 저의 생각과 기술적인 경험들을 기록하고 있습니다.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/posts">
          <Button size="lg" className="px-8 text-base font-semibold">
            게시글 보러가기
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
          { title: "깔끔한 디자인", desc: "읽기 편한 레이아웃" },
          { title: "반응형 웹", desc: "모바일에서도 완벽함" },
          { title: "최신 기술", desc: "Next.js 16 적용" },
        ].map((item, idx) => (
          <Card key={idx} className="border-none bg-gray-50/50 shadow-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


