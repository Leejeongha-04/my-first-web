# Context — my-first-web 프로젝트 상태 (Ch10)

## 현재 상태

- 마지막 작업일: 2026-05-19
- 완료된 작업 (Ch8): Supabase 데이터베이스 연결 (`lib/supabase/client.ts`, `server.ts`), `posts` 테이블 생성.
- 완료된 작업 (Ch9): Supabase Auth 연동, `AuthProvider` 및 `AuthContext` 구현, 로그인/회원가입 UI.
- 완료된 작업 (Ch10): 게시글 CRUD (목록, 상세, 작성, 수정, 삭제) 구현 및 UI 연동 완료.
- 미착수: Ch11 RLS 보안 설정, Ch12 이미지 업로드 (Supabase Storage).

## 기술 결정 사항

- **Next.js 16 (App Router)**: `next/router` 대신 항상 `next/navigation` 사용.
- **인증**: Supabase Auth (Email), `useAuth` 훅을 통한 클라이언트 권한 체크.
- **Supabase**: `lib/supabase/client.ts`와 `server.ts`를 각각의 환경(클라이언트/서버)에서 적절히 사용.
- **CRUD 패턴**:
  - `select`: 서버 컴포넌트(`getPosts`, `getPost`)에서 `lib/supabase/server.ts`를 통해 수행.
  - `insert/update/delete`: 클라이언트 컴포넌트에서 `lib/supabase/client.ts`(`posts-client.ts`)를 통해 수행.
- **작성자 UI 분기**: `user.id === post.user_id` 조건을 통해 수정/삭제 버튼 노출 여부 결정.
- **보안**: Ch10에서는 클라이언트 단의 UX 처리만 하며, 실제 DB 보안은 Ch11 RLS에서 처리.

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
