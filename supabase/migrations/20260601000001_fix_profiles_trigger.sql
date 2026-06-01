-- 1. 유저 생성 시 프로필을 자동으로 만드는 함수 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (new.id, new.raw_user_meta_data->>'username', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 트리거 설정 (회원가입 시 위 함수 실행)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. 현재 누락된 프로필들 한꺼번에 생성 (이미 가입한 유저들을 위해)
INSERT INTO public.profiles (id, username, role)
SELECT id, raw_user_meta_data->>'username', 'user'
FROM auth.users
ON CONFLICT (id) DO NOTHING;
