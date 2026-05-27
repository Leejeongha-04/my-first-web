-- posts 테이블에 image_url 컬럼 추가
alter table posts add column image_url text;

-- 이미지 업로드를 위한 Storage 버킷 생성 (이미 존재할 수 있으므로 확인 후 생성)
-- 참고: supabase 라이브러리를 통해 생성하거나 대시보드에서 생성하는 것이 일반적이나, 
-- SQL로 버킷 환경을 설정하는 예제입니다.
insert into storage.buckets (id, name, public)
values ('post_images', 'post_images', true)
on conflict (id) do nothing;

-- Storage RLS 정책 (누구나 읽기 가능, 인증된 사용자는 업로드 가능)
create policy "Public Access" on storage.objects for select using (bucket_id = 'post_images');
create policy "Authenticated users can upload images" on storage.objects for insert with check (
  bucket_id = 'post_images' AND auth.role() = 'authenticated'
);
