-- posts 테이블에 여러 이미지를 저장할 수 있도록 image_urls 컬럼 추가 (text array)
alter table posts add column image_urls text[] default '{}';

-- 기존 image_url 데이터가 있다면 image_urls로 마이그레이션
update posts set image_urls = array[image_url] where image_url is not null and (image_urls is null or image_urls = '{}');
