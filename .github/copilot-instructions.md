## Tech Stack

- Next.js 16.2.1 (App Router only) - 교재 기준: v14.x
- React 19.2.4 - 교재 기준: v18.x
- Tailwind CSS 4 - 교재 기준: v3.x
- Supabase (@supabase/supabase-js v2.x, @supabase/ssr)
- shadcn/ui (components/ui/ 경로에 설치됨)

## Project Context (Ch10)

- Ch8 Supabase 연결 완료 (`lib/supabase/client.ts`, `lib/supabase/server.ts`)
- Ch9 인증 구현 완료 (`contexts/AuthContext.tsx`, `useAuth` hook)
- Ch10 게시글 CRUD 구현 중
- 데이터 모델 (Ch8 기준):
  - **posts**: `id` (uuid, PK), `user_id` (uuid, references profiles), `title` (text), `content` (text), `created_at` (timestamptz)
  - **profiles**: `id` (uuid, PK, auth.users 참조), `username` (text), `avatar_url` (text), `role` (text)

## Coding Conventions

- Default to Server Components unless a Client Component is required.
- Use Tailwind CSS for styling.
- Keep components simple and easy to verify.
- Prefer files inside `app/` for routes.

## Design Tokens

- Primary color: shadcn/ui --primary
- Background: --background
- Card: shadcn/ui Card 컴포넌트 사용 (rounded-lg shadow-sm)
- Spacing: 컨텐츠 간격 space-y-6, 카드 내부 p-6
- Max width: max-w-4xl mx-auto (메인 컨텐츠)
- 반응형: md 이상 2열 그리드, 모바일 1열

## Component Rules

- UI 컴포넌트는 shadcn/ui 사용 (components/ui/)
- Button, Card, Input, Dialog 등 shadcn/ui 컴포넌트 우선
- 커스텀 컴포넌트는 components/ 루트에 배치
- Tailwind 기본 컬러 직접 사용 금지 → CSS 변수(디자인 토큰) 사용

## Known AI Mistakes

- Do not use `next/router`; use `next/navigation` when navigation is needed.
- Do not create `pages/` router files; this project uses the App Router.
- Do not add `"use client"` unless interactivity or browser APIs are actually needed.
- 게시글 수정/삭제 UI 노출은 클라이언트 권한 체크(UX)를 따르되, 실제 보안은 Ch11 RLS에서 처리함을 인지한다.
