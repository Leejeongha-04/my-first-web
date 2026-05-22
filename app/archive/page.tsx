import { Card, CardContent } from "@/components/ui/card";
import { Archive, FlaskConical, NotebookPen, Telescope, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ArchivePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-10 px-6">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">아카이브</h1>
        <p className="text-muted-foreground mt-1">지식과 경험의 궤적을 탐색합니다.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { title: "보관소", desc: "완성된 글과 정리된 자료를 보관하는 공간", icon: Archive, slug: "보관소" },
          { title: "연구실", desc: "실험하고 개발한 과정과 결과를 기록", icon: FlaskConical, slug: "연구실" },
          { title: "기록실", desc: "회고와 생각, 일상 기록을 남기는 공간", icon: NotebookPen, slug: "기록실" },
          { title: "관측소", desc: "발견한 것들과 아이디어 파편을 모아두는 공간", icon: Telescope, slug: "관측소" },
        ].map((item, idx) => (
          <Link href={`/posts?cat=${item.slug}`} key={idx}>
            <Card className="border-none bg-secondary/20 hover:bg-secondary/40 transition-all group cursor-pointer shadow-sm hover:shadow-md h-full">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-background rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary/80" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-1">
                    <h4 className="font-bold text-lg tracking-tight">{item.title}</h4>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed px-2">
                    {item.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

