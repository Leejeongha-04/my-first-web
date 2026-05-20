# ARCHITECTURE.md (Ch10 게시글 CRUD)

## 1. 프로젝트 목표
Next.js 16과 Supabase를 활용한 실전 풀스택 게시판 구축.
- **실시간성**: Supabase Database와 Auth를 연동한 동적 웹 서비스.
- **보안성**: Ch11에서 RLS(Row Level Security)를 적용하여 데이터베이스 가시성과 무결성을 보호함. Supabase CLI 마이그레이션으로 정책을 관리함.
- **성능**: Next.js App Router의 Server Components를 최대한 활용하여 초기 로딩 성능 최적화.

## 2. 페이지 맵 (Page Map)
- `/`: 홈 (환영 메시지 및 주요 안내) - **공개**
- `/posts`: 게시글 목록 (Server Component) - **공개**
  - `/posts/[id]`: 게시글 상세 (Server Component) - **공개**
  - `/posts/new`: 새 게시글 작성 (Client Component) - **인증 필요**
  - `/posts/[id]/edit`: 게시글 수정 (Client Component) - **인증 필요 (작성자)**
- `/login`: 로그인 페이지 - **공개**
- `/signup`: 회원가입 페이지 - **공개**

## 3. 핵심 아키텍처 및 유저 플로우

### 인증 (Auth - Ch9 완료)
- Supabase Auth를 사용하며, `contexts/AuthContext.tsx`의 `AuthProvider`를 통해 앱 전체에 유저 상태를 공급합니다.
- 로그인 여부에 따라 `/posts/new` 등의 접근 권한을 UX 레벨에서 제어합니다.

### 게시글 CRUD (Ch10 구현 완료)
1. **목록/상세**: 서버 컴포넌트 환경에서 `lib/supabase/server.ts`를 사용하여 DB 데이터를 직접 조회합니다.
2. **작성/수정/삭제**: 클라이언트 컴포넌트에서 `useAuth` 훅으로 작성자 권한을 체크한 뒤, `lib/supabase/client.ts`를 사용하여 Supabase에 요청을 보냅니다.
3. **컴포넌트 구조**:
   - `PostActions`: 상세 페이지 내 수정/삭제 버튼 및 삭제 다이얼로그(Dialog) 관리.
   - `SearchBar`: 목록 페이지 내 게시글 검색 기능 제공.
4. **보안 (Ch11 진행 중)**: 
   - RLS를 활성화하여 인증되지 않은 유저나 타 유저가 데이터를 조작하지 못하도록 DB 레벨에서 차단합니다.
   - 정책은 Supabase CLI 마이그레이션 파일(`supabase/migrations/`)로 형상 관리합니다.

## 4. 데이터 모델 (Ch8 기준 필수 준수)
### `profiles` 테이블
- `id` (uuid): PK, `auth.users(id)` 참조
- `username` (text): 사용자 이름
- `avatar_url` (text): 프로필 이미지 URL
- `role` (text): 역할 (admin, user 등)

### `posts` 테이블
- `id` (uuid): PK
- `user_id` (uuid): 작성자 ID (`profiles(id)` 참조)
- `title` (text): 제목
- `content` (text): 내용
- `created_at` (timestamptz): 생성일

## 5. 컴포넌트 규칙
- **UI**: `components/ui/`에 위치한 shadcn/ui 컴포넌트를 기반으로 합니다.
- **Shared**: 여러 페이지에서 공유되는 로직은 `components/` 또는 `lib/`에 배치합니다.

