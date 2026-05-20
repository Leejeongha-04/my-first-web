# Context — my-first-web 프로젝트 상태 (Ch11)

## 현재 상태

- 마지막 작업일: 2026-05-20
- 완료된 작업 (Ch10): 게시글 CRUD (목록, 상세, 작성, 수정, 삭제) 구현 및 UI 연동 완료.
- 진행 중 (Ch11): Supabase RLS(Row Level Security) 보안 설정 및 마이그레이션 관리.
- 미착수: Ch12 이미지 업로드 (Supabase Storage).

## 기술 결정 사항

- **Next.js 16 (App Router)**: `next/navigation` 사용, React 19 기반.
- **보안 (RLS)**: 
  - SQL Editor가 아닌 **Supabase CLI 마이그레이션**으로 정책 관리.
  - `auth.uid()`와 `posts.user_id`를 매칭하여 데이터 접근 제어.
  - 클라이언트 UI 분기(수정/삭제 버튼)는 UX 향상을 위함이며, 실제 보안은 RLS가 최종 방어.
  - **service_role** 키는 클라이언트 환경에서 절대 노출/사용 금지.
- **인증**: Supabase Auth (Email), `AuthContext`를 통한 클라이언트 상태 유지.
- **CRUD 패턴**:
  - `select`: 서버 컴포넌트(`lib/supabase/server.ts`) 및 클라이언트 컴포넌트 모두 공개 데이터에 접근.
  - `mutation`: RLS 정책에 의해 인증된 유저만 자신의 데이터 수정/삭제 가능.

## 생성/수정 파일 (Ch10)
- `lib/posts-server.ts`: 서버 측 데이터 fetching (목록, 상세)
- `lib/posts-client.ts`: 클라이언트 측 데이터 mutation (생성, 수정, 삭제)
- `app/posts/page.tsx`: 게시글 목록 페이지
- `app/posts/[id]/page.tsx`: 게시글 상세 페이지 (작성자 체크 로직 포함)
- `app/posts/new/page.tsx`: 새 게시글 작성 페이지
- `app/posts/[id]/edit/page.tsx`: 게시글 수정 페이지
- `app/posts/PostActions.tsx`: 수정/삭제 버튼 컴포넌트 (Dialog 활용)

## 알려진 이슈 및 해결

- Tailwind CSS 4 기준: `@import "tailwindcss"` 사용, `tailwind.config.js` 대신 CSS 변수 테마 사용.
- Server Component 제한: `useRouter` 대신 `redirect()` 또는 `Link` 사용.

## 알게 된 점

- Supabase `@supabase/ssr` 패키지를 이용한 서버 측 세션 관리 및 SSR 대응.
- shadcn/ui와 Tailwind v4의 연동 방식 (CSS 변수 기반 테마).
