-- Ch11: posts 테이블 RLS(Row Level Security) 설정 및 보안 정책

-- 1. 테이블의 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 2. 기존 정책이 있을 경우 삭제 (중복 생성 에러 방지)
DROP POLICY IF EXISTS "Allow public read access" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own posts" ON posts;
DROP POLICY IF EXISTS "Allow authors to update their own posts" ON posts;
DROP POLICY IF EXISTS "Allow authors to delete their own posts" ON posts;

-- 3. [SELECT] 누구나 읽기 허용 (비로그인 유저 포함)
CREATE POLICY "Allow public read access"
ON posts FOR SELECT
TO public
USING (true);

-- 4. [INSERT] 로그인한 사용자만 본인의 user_id로 게시글 생성 허용
CREATE POLICY "Allow authenticated users to insert their own posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 5. [UPDATE] 작성자만 본인의 게시글 수정 가능
-- USING: 현재 DB에 있는 행이 내 것인지 확인
-- WITH CHECK: 수정 후의 데이터도 여전히 내 소유인지 확인 (ID 변조 방지)
CREATE POLICY "Allow authors to update their own posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. [DELETE] 작성자만 본인의 게시글 삭제 가능
CREATE POLICY "Allow authors to delete their own posts"
ON posts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- ==========================================
-- 2. profiles 테이블 보안 정책
-- ==========================================

-- RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Allow public read access" ON profiles;
DROP POLICY IF EXISTS "Allow users to update their own profile" ON profiles;

-- [SELECT] 누구나 프로필 조회 가능
CREATE POLICY "Allow public read access"
ON profiles FOR SELECT
TO public
USING (true);

-- [UPDATE] 본인의 프로필 정보만 수정 가능
CREATE POLICY "Allow users to update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

Ch11 RLS 검증을 해줘.

확인할 것:
1. npm run build가 성공하는지
2. app, lib, components, contexts 안에 service_role, SUPABASE_SERVICE_ROLE, sb_secret_, sbp_ 같은 민감 키가 노출되지 않았는지
3. supabase/migrations/<timestamp>_add_posts_rls.sql 파일이 Git 변경 목록에 포함되는지
4. 브라우저 우회 테스트 결과가 기대와 맞는지

브라우저 테스트 결과:
- 비로그인 조회:
- 비로그인 작성:
- 사용자 A 작성:
- 사용자 B가 A 글 수정:
- 사용자 B가 A 글 삭제:

출력:
1. 실행한 명령
2. 통과/실패/추가 확인 필요 판정
3. 문제가 있으면 수정할 SQL 또는 파일