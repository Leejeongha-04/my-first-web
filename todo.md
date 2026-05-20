# TODO — my-first-web (Ch11 기준)

## 1단계: 프로젝트 초기화 및 Supabase 연결 (Ch7~8)
- [x] 프로젝트 초기 설정 및 ARCHITECTURE.md 작성
- [x] shadcn/ui 초기화 및 공통 레이아웃 구성
- [x] [Ch8] Supabase 연결 설정 (`lib/supabase/client.ts`, `server.ts`)
- [x] [Ch8] `posts` 테이블 생성 및 SQL 기록

## 2단계: 인증 및 게시글 CRUD (Ch9~10)
- [x] [Ch9] Supabase Auth 연동 (로그인/회원가입 UI 및 로직)
- [x] [Ch9] `AuthProvider` 및 `useAuth` 훅 구현
- [x] [Ch10] 게시글 목록 조회 (Server Components)
- [x] [Ch10] 게시글 상세 조회 (Server Components / Dynamic Routes)
- [x] [Ch10] 새 게시글 작성 (Client Components / Action)
- [x] [Ch10] 게시글 수정 및 삭제 (권한 체크 포함 UX)

## 3단계: 보안 및 이미지 (Ch11~12)
- [ ] [Ch11] Supabase CLI를 이용한 RLS 마이그레이션 생성
- [ ] [Ch11] `profiles` 테이블 RLS 정책 적용 (조회:전체, 수정:본인)
- [ ] [Ch11] `posts` 테이블 RLS 정책 적용 (조회:전체, 생성/수정/삭제:본인)
- [ ] [Ch11] RLS 적용에 따른 기능 동작 테스트
- [ ] [Ch12] 게시글 이미지 업로드 (Supabase Storage)

## 진행률: 84.6% (11/13)


