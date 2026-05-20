# my-first-web Project Rules (Ch11)

## Framework & Tech Stack
- **Next.js 16.2.1**: App Router 기반 (Next 14 교재 기준 대비 최신). `next/navigation` 필수 사용.
- **React 19.2.4**: 최신 React 컴포넌트 및 클라이언트 사이드 액션 활용.
- **Supabase**: `lib/supabase/client.ts`(브라우저) 및 `server.ts`(서버) 사용.
- **Auth**: Ch9에서 구현된 `useAuth` 훅 및 `AuthProvider` 활용.
- **Styling**: Tailwind CSS 4 및 shadcn/ui 기반.

## Security & RLS (Ch11)
- 모든 테이블은 **Row Level Security(RLS)**가 활성화되어야 한다.
- 정책(Policy)은 Supabase SQL Editor가 아닌 **Supabase CLI 마이그레이션**으로 생성하고 기록한다.
- 클라이언트 UI 분기(수정/삭제 버튼)는 UX 향상을 위함이며, 실제 권한 검증은 RLS가 담당함을 명심한다.
- **service_role** 키는 어떠한 경우에도 클라이언트 단 코드(JS/TS)에서 사용되어서는 안 된다.

## Development Priorities
- 게시글 및 프로필 데이터 접근 시 RLS 정책이 의도대로 동작하는지 항상 확인한다.
- 마이그레이션 파일은 `supabase/migrations/` 경로에 순차적으로 생성한다.
