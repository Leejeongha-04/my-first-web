// type = "게시글 데이터는 이런 모양이다"라고 정의 (AI가 자동 생성)
export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "React 19 새 기능 정리",
    content: "React 19에서 달라진 점과 서버 컴포넌트의 진화에 대해 알아봅니다.",
    author: "김코딩",
    date: "2026-03-30",
  },
  {
    id: 2,
    title: "Tailwind CSS 4 변경사항",
    content: "Tailwind CSS 4의 핵심적인 변화와 새로운 JIT 엔진의 특징을 살펴봅니다.",
    author: "이디자인",
    date: "2026-03-28",
  },
  {
    id: 3,
    title: "Next.js 16 App Router 가이드",
    content: "App Router를 사용하여 더 빠르고 효율적인 웹 애플리케이션을 구축하는 방법입니다.",
    author: "박개발",
    date: "2026-03-25",
  },
];
