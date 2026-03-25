# 프로젝트 기술 스택
- Next.js: 16.2.1 (App Router 전용)
- React: 19.2.4
- Tailwind CSS: 4.x (@tailwindcss/postcss 사용)

# 코딩 컨벤션
- 기본적으로 항상 서버 컴포넌트(Server Components)를 사용합니다.
- Hook이나 인터랙션이 필요한 경우에만 제한적으로 클라이언트 컴포넌트("use client")를 사용합니다.
- 모든 스타일링에는 Tailwind CSS를 사용합니다. globals.css를 제외하고 별도의 .css 파일을 생성하지 않습니다.
- 모든 컴포넌트와 유틸리티에는 TypeScript를 사용합니다.

# AI가 자주 하는 실수 (금지 사항)
- `next/router`를 사용하지 마세요. 항상 `next/navigation`을 사용합니다.
- `pages/` 디렉토리를 사용하지 마세요. `app/` 디렉토리(App Router)만 사용합니다.
- Next.js 15+ 버전에서 Page/Layout의 `params`와 `searchParams`는 Promise이므로 반드시 `await`해야 합니다.
  - 예시: `const { id } = await params;`
