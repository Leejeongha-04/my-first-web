# my-first-web Project Rules (Ch10)

## Framework & Tech Stack
- **Next.js 16.2.1**: App Router 기반. `next/navigation` 필수 사용.
- **Supabase**: `lib/supabase/client.ts`(브라우저) 및 `server.ts`(서버) 사용.
- **Auth**: Ch9에서 구현된 `useAuth` 훅 및 `AuthProvider` 활용.
- **Styling**: Tailwind CSS 4 및 shadcn/ui 기반.

## Development Priorities (Ch10)
- 게시글 CRUD 기능을 구현할 때, 서버 컴포넌트(조회)와 클라이언트 컴포넌트(작성/수정/삭제)를 명확히 구분한다.
- UI 상의 권한 체크는 `useAuth`의 `user.id`와 `post.author_id`를 비교하여 처리한다.
- 데이터 작업 시 `lib/posts-server.ts`와 `lib/posts-client.ts`와 같은 분리된 로직 파일을 선호한다.

## Known Constraints
- **데이터 모델 (Ch8 기준)**:
  - `posts`: `id`, `user_id` (profiles 참조), `title`, `content`, `created_at`
  - `profiles`: `id` (auth.users 참조), `username`, `avatar_url`, `role`
- RLS 보안은 Ch11에서 다룰 예정이므로, 현재는 기능 동작에 집중하되 UI에서만 권한을 가린다.
