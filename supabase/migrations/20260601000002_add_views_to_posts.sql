-- posts 테이블에 조회수(views) 컬럼 추가
alter table posts add column if not exists views integer default 0;

-- 조회수 증가를 위한 RPC 함수 생성
create or replace function increment_views(post_id uuid)
returns void as $$
begin
  update posts
  set views = views + 1
  where id = post_id;
end;
$$ language plpgsql security definer;
