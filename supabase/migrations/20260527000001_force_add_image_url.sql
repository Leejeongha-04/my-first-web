-- posts 테이블에 image_url 컬럼이 없는 경우를 대비해 다시 추가 시도
do $$ 
begin 
  if not exists (select from information_schema.columns where table_name = 'posts' and column_name = 'image_url') then
    alter table posts add column image_url text;
  end if;
end $$;

-- 스토리지 설정 재확인
insert into storage.buckets (id, name, public)
values ('post_images', 'post_images', true)
on conflict (id) do nothing;

-- RLS 정책 재확인 (기존 정책이 있으면 실패할 수 있으므로 drop 후 create)
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using (bucket_id = 'post_images');

drop policy if exists "Authenticated users can upload images" on storage.objects;
create policy "Authenticated users can upload images" on storage.objects for insert with check (
  bucket_id = 'post_images' AND auth.role() = 'authenticated'
);
