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
    title: "Next.js 16과 React 19 시작하기",
    content: "Next.js 16의 새로운 기능과 React 19의 서버 컴포넌트를 활용한 개발 방법을 알아봅니다.",
    author: "관리자",
    date: "2026-04-01",
  },
  {
    id: 2,
    title: "Tailwind CSS 4.0 스타일링 가이드",
    content: "더 강력해진 Tailwind CSS 4.0을 사용하여 쉽고 빠르게 웹 디자인을 완성하는 팁입니다.",
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
