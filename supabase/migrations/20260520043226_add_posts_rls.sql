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

