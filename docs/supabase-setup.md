  npx supabase init
# Supabase 설정 가이드

이 프로젝트는 백엔드로 **Supabase**를 사용합니다. 아래 단계에 따라 프로젝트를 설정하세요.

## 1. Supabase 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com/)에 접속하여 로그온합니다.
2. `New Project`를 클릭합니다.
3. 프로젝트 이름(예: `my-first-web`), 데이터베이스 비밀번호를 설정하고 지역을 `Northeast Asia (Seoul)`로 선택합니다.
4. `Create new project`를 클릭합니다.

## 2. 환경 변수 설정
1. 프로젝트 루트에 `.env.local` 파일을 생성합니다.
2. Supabase 대시보드의 `Project Settings` > `API` 섹션에서 아래 값을 복사하여 `.env.local`에 붙여넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. 데이터베이스 테이블 생성
아래 SQL을 Supabase의 `SQL Editor`에서 실행하여 `posts` 테이블을 생성합니다.

```sql
-- posts 테이블 생성
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  body text not null,
  user_id uuid references auth.users(id) default auth.uid(),
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 설정
alter table posts enable row level security;

-- 모든 사용자가 게시글을 읽을 수 있도록 허용
create policy "Anyone can read posts"
  on posts for select
  using (true);

-- 인증된 사용자만 자신의 게시글을 작성할 수 있도록 허용
create policy "Authenticated users can create posts"
  on posts for insert
  with check (auth.uid() = user_id);

-- 인증된 사용자만 자신의 게시글을 수정할 수 있도록 허용
create policy "Users can update their own posts"
  on posts for update
  using (auth.uid() = user_id);

-- 인증된 사용자만 자신의 게시글을 삭제할 수 있도록 허용
create policy "Users can delete their own posts"
  on posts for delete
  using (auth.uid() = user_id);
```
