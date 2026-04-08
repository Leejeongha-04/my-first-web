// type = "게시글 데이터는 이런 모양이다"라고 정의 (AI가 자동 생성)
export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  { id: 1, title: "React 19 새 기능 정리", content: "React 19에서 달라진 점...", author: "김코딩", date: "2026-03-30" },
  { id: 2, title: "Tailwind CSS 4 변경사항", content: "Tailwind CSS 4의 핵심...", author: "이디자인", date: "2026-03-28" },
  { id: 3, title: "Next.js 16 App Router 가이드", content: "App Router를 사용하면...", author: "박개발", date: "2026-03-25" },
];
    author: "디자이너",
    date: "2026-04-03",
  },
  {
    id: 3,
    title: "TypeScript로 안전한 코드 작성하기",
    content: "정적 타입을 활용하여 런타임 에러를 줄이고 개발 생산성을 높이는 핵심 기법들을 소개합니다.",
    author: "개발자",
    date: "2026-04-05",
  },
];
