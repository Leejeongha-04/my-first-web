
Chapter 8. Supabase 시작하기 — A회차: 강의
미션: 내 블로그(my-blog)의 더미 데이터를 Supabase 실제 데이터베이스로 교체한다
이 장의 전체 흐름
아래 다이어그램이 이번 장에서 할 일의 전부이다. 8단계를 순서대로 진행하면 Supabase 연결이 완료된다.
​
단계
작업
실행
도구
섹션
①
Supabase 프로젝트 생성
🖱️ 직접
브라우저
8.2.1
②
API URL + anon key 복사
🖱️ 직접
대시보드
8.2.3
③
@supabase/ssr 패키지 설치
🤖 Copilot
터미널
8.3.1
④
.env.local에 키 입력
🖱️ 직접
VS Code
8.3.2
⑤
lib/supabase/client.js 작성
🤖 Copilot
VS Code
8.3.3
⑥
SQL 생성 + SQL Editor 실행
🤖+🖱️​
대시보드
8.4.1~2
⑦
localhost:3000/test 연결 확인
🤖 Copilot
브라우저
8.3.5
⑧
Vercel에 환경 변수 등록
🖱️ 직접
Vercel
8.3.4
고정 버전 (이 교재 기준):
패키지
버전
next
14.2.21
@supabase/supabase-js
2.47.12
@supabase/ssr
0.5.2
tailwindcss
3.4.17
바이브코딩 원칙 (이번 장)
이번 장의 바이브코딩 핵심은 “DB/환경변수/연결 방식을 Copilot이 추측하지 않게 만드는 것”이다. DB는 한 번 잘못 만들면 이후 장(인증, CRUD, RLS, UX) 전체가 꼬인다.
스키마를 먼저 고정: 테이블 이름/컬럼/타입/관계를 설계서(Ch7) 기준으로 확정하고, Copilot에게 그대로 준다.
환경변수 이름을 정확히: 로컬(.env.local)과 배포(Vercel) 값, NEXT_PUBLIC_* 공개 범위를 명시한다.
Supabase 자원을 명시: auth.users 기반 + 프로젝트의 public.users(Auth 확장) 같은 “확장 테이블” 사용 여부를 먼저 결정한다.
실행 순서를 포함: (1) 프로젝트 생성 → (2) 키 발급/환경변수 → (3) 클라이언트 연결 → (4) SQL 실행 → (5) Next.js에서 읽기 테스트.
검증을 “쿼리”로 한다: “잘 됐어요”가 아니라, select로 데이터가 보이고, 콘솔/네트워크가 정상인지로 확인한다.
제작 과정 (처음부터 시작)
Ch7에서 문서(ARCHITECTURE.md, copilot-instructions.md)로 “무엇을 만들지”를 정했다면, 이번 장에서는 데이터베이스를 ‘사실(Truth)’로 고정한다.
여기서 스키마/키/연결이 흔들리면, 이후(인증/CRUD/RLS/UX) 단계는 전부 흔들린다.
8.0.1 Copilot이 강한 구간 vs 굳이 안 써도 되는 구간
Copilot이 강한 구간: 스키마 초안 검토, SQL 스크립트 정리, 체크리스트/검증 쿼리 작성, Next.js 연결 코드 뼈대
굳이 안 써도 되는 구간: Supabase 대시보드 클릭 작업, 키 발급/복사/붙여넣기, 비밀키/권한 관리, 실제 SQL 실행 버튼 클릭
8.0.2 권장 제작 순서 (DB 고정 루트)
Supabase 프로젝트 생성: 프로젝트/리전/DB 패스워드를 정한다.
환경변수 고정: .env.local에 URL/ANON KEY를 넣고 “앱이 키를 읽는다”까지 확인한다.
스키마 확정: profiles와 posts 테이블을 기준으로 FK/제약을 만든다.
RLS는 초안이라도 켠다: 최소 정책(SELECT/INSERT)부터 걸어 “보안 기본값”을 만든다.
연결 검증: Next.js에서 SELECT 1개, INSERT 1개를 성공시키고 결과를 확인한다.
8.0.3 제작 과정용 Copilot 프롬프트 세트 (단계별)
(1) Supabase 프로젝트 생성 체크리스트
​
(2) .env.local 설계 + 보안 규칙
​
(3) Supabase 클라이언트 코드 뼈대(브라우저/서버)
​
(4) 스키마 확정: supabase-schema.sql 실행/검토
​
(5) 연결 검증: “SELECT 1개 + INSERT 1개” 테스트
​
Copilot 프롬프트 (복사/붙여넣기)
​
학습목표
BaaS(Backend as a Service)의 개념과 장점을 설명할 수 있다
Supabase 프로젝트를 생성하고 대시보드를 탐색할 수 있다
Next.js 프로젝트에 Supabase 클라이언트를 설치하고 환경 변수를 설정할 수 있다
7장 설계서를 기반으로 SQL 테이블을 생성할 수 있다
테이블 관계(1:N)를 이해하고 외래 키를 설정할 수 있다
오늘의 미션 + 빠른 진단
오늘의 질문: "지금까지 만든 블로그는 lib/posts.js의 더미 데이터를 사용한다. 새 글을 추가하거나 수정하려면 어떻게 해야 할까?"
빠른 진단 (1문항):
다음 중 BaaS(Backend as a Service)의 설명으로 올바른 것은?
(A) 백엔드 서버 코드를 직접 작성하여 배포하는 방식
(B) 백엔드 기능(DB, 인증, API)을 서비스로 제공받아 사용하는 방식
(C) 프론트엔드 없이 서버만으로 앱을 만드는 방식
정답: (B) — BaaS는 데이터베이스, 인증, API 등을 이미 만들어진 서비스로 사용한다.
8.1 왜 Supabase인가?
Ch6까지 만든 블로그는 lib/posts.js의 더미 데이터를 사용한다. 새로고침해도 데이터는 보이지만 새 글을 추가하거나 수정할 수 없다 — 하드코딩된 배열이기 때문이다. 이번 장에서는 이 더미 데이터를 Supabase의 실제 데이터베이스로 교체한다. 같은 /posts 경로, 같은 UI, 같은 컴포넌트 — 데이터 소스만 바뀐다. 이것이 프론트엔드(Ch1~6)에서 백엔드(Ch8+)로 넘어가는 핵심 전환점이다.
Supabase 선택 이유: PostgreSQL 기반(SQL 학습 가능), 오픈소스(종속 없음), 무료(2개 프로젝트), Next.js 공식 연동(Vercel 파트너).
원리 — BaaS(Backend as a Service)
전통 방식은 백엔드 서버(Express, Django 등)를 직접 만들어야 하지만, BaaS는 DB·인증·API를 이미 만들어진 서비스로 제공한다. 주방을 직접 짓는 대신 공유 주방을 빌리는 것과 같다.
표 8.2 BaaS가 제공하는 기능
기능
직접 만들면
BaaS(Supabase) 사용 시
데이터베이스
PostgreSQL 설치, 스키마 설계
대시보드에서 테이블 생성
인증
회원가입, OAuth 직접 구현
signInWithOAuth() 한 줄
API
REST 엔드포인트 설계
테이블 생성 시 자동 생성
보안
미들웨어, 권한 체크 구현
RLS 정책으로 DB 레벨 강제
8.2 Supabase 프로젝트 생성 🖱️ 직접 실행
지금부터 Supabase 프로젝트를 직접 만든다. 이 설정은 Ch9~11까지 계속 사용하므로 정확히 따라한다.
왜 수동인가? — Supabase 대시보드 회원가입/프로젝트 생성/키 복사는 브라우저에서 직접 해야 한다. Copilot이 대신할 수 없는 영역이다.
8.2.1 가입 및 새 프로젝트 만들기
실습 안내: 안내 순서를 따라 Supabase 프로젝트를 설정한다.
① Supabase 가입: https://supabase.com 에서 GitHub 계정으로 가입한다 (별도 이메일 가입 불필요)
② 새 프로젝트 생성: 대시보드에서 "New Project" 클릭
③ 프로젝트 설정:
표 8.3 프로젝트 생성 시 입력 항목
항목
입력 값
설명
Organization
(기본값)
개인 조직
Project name
my-board
영문 소문자, 하이픈 사용
Database Password
(강한 비밀번호)
반드시 메모해둔다 — 이후 변경 불가
Region
Northeast Asia (Tokyo)
한국에서 가장 가까운 리전
Pricing Plan
Free
무료 플랜 선택
④ 생성 대기: 프로젝트 생성에 약 1~2분이 걸린다. 이 사이 대시보드 구조를 살펴본다.
팁: Database Password는 나중에 변경할 수 없다. 비밀번호를 까먹으면 프로젝트를 삭제하고 다시 만들어야 한다. 반드시 어딘가에 적어두자.
8.2.2 대시보드 탐색: Table Editor, SQL Editor, Auth
Supabase 대시보드는 백엔드의 모든 기능을 한 곳에서 관리하는 제어판이다. 핵심 메뉴 4가지를 익힌다:
표 8.4 Supabase 대시보드 핵심 메뉴
메뉴
역할
이 수업에서 사용 시점
Table Editor
테이블 생성/수정, 데이터 확인
Ch8 (오늘), Ch10
SQL Editor
SQL 문 직접 실행
Ch8 (오늘), Ch10, Ch11
Authentication
인증 설정, 사용자 목록
Ch9
Project Settings
API 키, URL 확인
Ch8 (오늘)
다른 메뉴(Storage, Edge Functions, Realtime 등)는 이 수업에서 다루지 않지만, 프로젝트가 성장하면 필요해질 수 있다.
8.2.3 API 키 확인
Supabase와 Next.js를 연결하려면 두 가지 정보가 필요하다:
① API URL: https://[프로젝트ID].supabase.co 형태
② anon (public) key: 클라이언트에서 사용하는 공개 키 (JWT 형식)
2026년 현재 Supabase 대시보드는 API 키 체계가 개편되었다. API URL과 API Key의 확인 위치가 다르므로 주의한다.
① API URL 확인: 왼쪽 사이드바 Integrations → Data API → API URL
​
Data API 페이지에서 Enable Data API 토글이 켜져 있는지도 확인한다. 이 토글이 꺼져 있으면 Supabase 클라이언트 라이브러리가 작동하지 않는다.
② API Key 확인: 왼쪽 사이드바 Project Settings → API Keys
API Keys 페이지에는 두 개의 탭이 있다:
탭
내용
Publishable and secret API keys
새로운 키 체계 (sb_publishable_..., sb_secret_... 형식)
Legacy anon, service_role API keys
기존 JWT 기반 키 (eyJhbG... 형식)
이 교재의 실습 코드는 Legacy anon 키 표기를 기준으로 설명한다.
Supabase 대시보드에서 Publishable/Secret 키만 보이는 경우, 브라우저 코드에는 Publishable(공개용) 키를 사용하고 Secret 키는 절대 넣지 않는다.
​
anon key가 공개 가능하다는 것이 의외일 수 있다. Supabase는 **RLS(Row Level Security)**로 데이터를 보호한다. anon key로 접근해도 RLS 정책이 허용한 데이터만 볼 수 있다. RLS는 Ch11에서 자세히 다룬다.
팁: anon key는 "집 주소"와 같다. 주소는 알려줘도 되지만, 실제 데이터를 보호하는 것은 RLS(잠금 장치)의 역할이다.
8.3 Next.js와 Supabase 연결
Supabase 프로젝트가 준비되었으면 기존 Next.js 프로젝트에 연결한다.
8.3.1 패키지 설치 ⌨️ 터미널
🤖 Copilot 프롬프트
"Next.js App Router 프로젝트에 Supabase 클라이언트를 설치하고 초기 설정하는 방법을 알려줘.
@supabase/supabase-js와 @supabase/ssr 두 패키지가 필요해."
Copilot이 알려주는 명령어를 터미널에 붙여넣는다:
​
설치 후 버전 확인 — 설치된 Supabase 패키지 버전을 확인하고 copilot-instructions.md에 기록한다:
​
copilot-instructions.md의 Tech Stack 섹션에 추가한다:
​
새로운 패키지를 설치할 때마다 버전을 확인하고 copilot-instructions.md에 기록하는 습관을 들이자. 이것이 Ch2에서 배운 버전 동기화 프로토콜이다.
표 8.5 Supabase 패키지 역할
패키지
역할
@supabase/supabase-js
Supabase 핵심 클라이언트 (DB, Auth, Storage)
@supabase/ssr
Next.js App Router에서 쿠키 기반 세션 관리
@supabase/ssr은 서버 컴포넌트(Server Component)와 클라이언트 컴포넌트(Client Component) 양쪽에서 Supabase를 안전하게 사용하기 위한 패키지이다. Next.js App Router 환경에서는 반드시 함께 설치한다.
8.3.2 환경 변수 설정 (.env.local) 🖱️ 직접 실행
API 키를 프로젝트에 저장한다. 프로젝트 루트에 .env.local 파일을 생성한다:
​
주의할 점 3가지:
NEXT_PUBLIC_ 접두사: Next.js에서 브라우저에 노출할 환경 변수에는 반드시 NEXT_PUBLIC_ 접두사를 붙인다. 이 접두사가 없으면 서버에서만 사용 가능하다.
.gitignore 확인: .env.local은 기본적으로 .gitignore에 포함되어 있다. 절대 Git에 커밋하지 않는다.
실제 값 입력: [프로젝트ID]와 eyJhbG... 부분을 본인의 Supabase 대시보드에서 확인한 값으로 교체한다.
흔한 실수: .env.local 대신 .env에 키를 넣는 경우. .env는 Git에 커밋될 수 있다. 반드시 .env.local을 사용한다.
8.3.3 Supabase 클라이언트 초기화 🤖 바이브코딩
🤖 Copilot 프롬프트
"Next.js App Router에서 Supabase 클라이언트를 초기화하는 유틸리티 파일을 만들어줘.
@supabase/ssr 패키지를 사용해서, 브라우저용(lib/supabase/client.js)과 서버용(lib/supabase/server.js) 두 파일을 만들어줘."
Supabase 공식 문서에서는 브라우저용과 서버용 두 개의 클라이언트를 분리한다. 먼저 폴더 구조를 만든다:
​
브라우저용 클라이언트:
​
!(non-null assertion)는 TypeScript에게 "이 값은 반드시 존재한다"고 알려주는 것이다. 환경 변수가 .env.local에 올바르게 설정되어 있다면 안전하다.
코드 읽기 가이드 — 3줄이지만 중요한 포인트가 있다:
표 8.6 Supabase 브라우저 클라이언트 코드 해석
줄
코드
의미
1
import { createBrowserClient }
@supabase/ssr에서 브라우저용 클라이언트 생성 함수를 가져온다
3
export function createClient()
팩토리 함수 — 호출할 때마다 클라이언트를 생성한다
4-5
process.env.NEXT_PUBLIC_...!
.env.local에 설정한 환경 변수를 읽는다 (!는 non-null assertion)
왜 createClient라는 이름인가? Supabase 공식 문서가 이 이름을 사용한다. 프로젝트 전체에서 import { createClient } from "@/lib/supabase/client"로 통일하면 코드가 일관된다.
서버용 클라이언트 — 서버 컴포넌트에서도 Supabase를 사용해야 하는 경우가 있다(예: 초기 데이터 로딩, 인증 확인). 이때는 쿠키를 처리하는 서버용 클라이언트가 필요하다:
​
표 8.7 브라우저 vs 서버 클라이언트 비교
브라우저 (client.js)
서버 (server.js)
import
createBrowserClient
createServerClient
사용 위치
"use client" 컴포넌트
Server Component, Route Handler
쿠키
자동 처리
cookies() 수동 연결
Ch9 이후
로그인/로그아웃 UI
미들웨어, 보호된 페이지
서버용 클라이언트는 Ch9(인증)에서 본격적으로 사용한다. 지금은 lib/supabase/client.js(브라우저용)만 있으면 충분하다.
검증 체크리스트 — 클라이언트 초기화가 올바른지 확인:

@supabase/ssr의 createBrowserClient를 사용하는가? (구버전인 createClient from @supabase/supabase-js를 직접 사용하면 쿠키 처리가 안 된다)

환경 변수 이름이 .env.local과 정확히 일치하는가?

service_role 키가 아닌 anon 키를 사용하는가?

lib/supabase/client.js와 lib/supabase/server.js 두 파일이 모두 있는가?
실습 안내: lib/supabase/client.js 파일을 만들고 개발 서버에서 에러 없이 실행되는지 확인한다.
8.3.4 Vercel 환경 변수 등록 + 배포 🖱️ 직접 실행
.env.local은 로컬 개발 전용이다. Vercel에 배포하면 .env.local은 무시된다. Vercel 대시보드에 환경 변수를 별도 등록해야 한다.
왜 수동인가? — Vercel 대시보드는 브라우저에서만 조작 가능하다. 환경 변수에는 API 키가 포함되므로 사람이 직접 확인하며 등록해야 한다.
① Vercel 대시보드 접속
https://vercel.com → 로그인 → 프로젝트 선택
② 환경 변수 등록
경로: Settings → Environment Variables
Key
Value
Environment
NEXT_PUBLIC_SUPABASE_URL
https://[프로젝트ID].supabase.co
Production, Preview, Development 모두 체크
NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOi... (anon key 전체)
Production, Preview, Development 모두 체크
각 변수 입력 후 Add 버튼을 클릭한다.
③ 재배포 (필수)
환경 변수를 등록한 후 반드시 재배포해야 적용된다:
방법 1: Deployments 탭 → 가장 최근 배포의 ⋮ 메뉴 → Redeploy 클릭
방법 2: 코드를 수정하고 git push → 자동 재배포
④ 배포 확인
배포 완료 후 Vercel이 제공하는 URL(https://프로젝트명.vercel.app)에 접속하여 정상 작동하는지 확인한다.
Vercel 배포 트러블슈팅:
증상
원인
해결
"로컬에서 되는데 배포하면 안 돼요"
Vercel에 환경 변수 미등록
Settings → Environment Variables 확인
환경 변수 등록했는데 안 됨
재배포 안 함
Redeploy 필수
NEXT_PUBLIC_ 변수가 undefined
Key 이름 오타
.env.local과 Vercel 대시보드의 Key 이름 정확히 비교
빌드 실패
코드 에러 or 패키지 문제
Vercel → Deployments → 빌드 로그 확인
팁: "로컬에서 되는데 배포하면 안 돼요"의 90%는 Vercel에 환경 변수를 안 넣었기 때문이다. 이 단계를 반드시 확인하자.
8.3.5 연결 테스트 🤖 바이브코딩
라이브 코딩: Supabase 프로젝트를 생성하고 Next.js와 연결한 뒤, 연결 테스트까지 전 과정을 진행한다.
모든 설정이 끝났으면 실제로 연결이 되는지 확인한다. 임시로 페이지에 테스트 코드를 작성한다:
​
http://localhost:3000/test에 접속해서 "Supabase 연결 성공!"이 보이면 설정이 올바르다.
연결 확인이 끝나면 app/test/ 폴더는 삭제해도 된다. 배포 전에 정리하는 습관을 들인다.
8.4 데이터 모델링
Supabase 연결이 완료되었다. 이제 **데이터를 저장할 그릇(테이블)**을 만들 차례이다.
원리 — 관계형 데이터베이스 기초
Supabase는 PostgreSQL(관계형 DB)을 사용한다. 데이터를 표(테이블) 형태로 저장하며, 엑셀 시트와 비슷하다.
용어
비유
설명
테이블(Table)
엑셀 시트
같은 종류의 데이터를 모은 표
행(Row)
엑셀 한 줄
데이터 하나 (게시글 1개)
열(Column)
칸 제목
데이터의 속성 (제목, 내용)
기본 키(PK)
주민번호
각 행을 고유하게 구분하는 값
외래 키(FK)
소속 코드
다른 테이블의 행을 참조하는 값
8.4.1 SQL 생성 — Copilot에게 요청 🤖 바이브코딩
Ch7에서 ARCHITECTURE.md에 설계한 데이터 모델을 실제 SQL 테이블로 만든다. 블로그에 필요한 최소 테이블은 profiles(사용자)와 posts(게시글) 2개이다.
왜 users가 아닌 profiles인가? — Supabase Auth는 내부적으로 auth.users를 관리한다. 추가 정보(닉네임 등)는 별도 profiles 테이블을 만들어 auth.users와 연결한다(공식 패턴).
Copilot에게 SQL을 요청한다. 구체적인 프롬프트가 핵심이다:
❌ 나쁜 프롬프트 — "Supabase에서 블로그 테이블 만들어줘" → AI가 임의로 열 이름/타입을 정하고, auth.users 연결 없이 자체 users 테이블을 만들 위험.
🤖 Copilot 프롬프트
"Supabase에서 블로그을 위한 SQL 테이블을 만들어줘.
profiles 테이블(id, username, avatar_url, role)과 posts 테이블(id, title, content, user_id, created_at)이 필요해.
profiles.id는 auth.users.id를 참조하고, posts.user_id는 profiles.id를 참조해.
role은 'user', 'counselor' 중 하나이고 기본값은 'user'.
RLS는 아직 설정하지 마."
Copilot이 생성한 SQL을 읽고 확인한다:
​
코드 읽기 가이드 — SQL을 처음 보더라도 읽을 수 있도록 한 줄씩 해석한다:
표 8.8 profiles 테이블 SQL 해석
SQL
의미
create table profiles (...)
profiles라는 이름의 테이블을 생성한다
id uuid
id 열의 타입은 UUID (고유 식별자)
references auth.users(id)
Supabase Auth의 users 테이블 id를 참조한다
on delete cascade
사용자가 삭제되면 프로필도 함께 삭제된다
username text
문자열 타입의 username 열
role text not null default 'user'
사용자 역할, 기본값은 일반 사용자('user')
check (role in ('user', 'counselor'))
허용되는 역할을 제한하는 CHECK 제약
created_at timestamptz default now()
생성 시각, 기본값은 현재 시간
primary key (id)
id를 기본 키로 설정
role 컬럼은 Ch9(인증)에서 프로필 조회, Ch11(RLS)에서 역할 기반 접근 제어에 활용한다. 지금은 컬럼만 추가해두고, 실제 활용은 이후 장에서 점진적으로 진행한다.
표 8.9 posts 테이블 SQL 해석
SQL
의미
id bigint generated always as identity
자동 증가하는 숫자 ID
title text not null
제목, 빈 값 불허
content text not null
내용, 빈 값 불허
user_id uuid references profiles(id)
작성자, profiles 테이블의 id를 참조
on delete cascade not null
작성자 삭제 시 게시글도 삭제, 빈 값 불허
created_at timestamptz default now()
생성 시각, 기본값은 현재 시간
원리 — 1:N (일대다) 관계
profiles (1) ──────< posts (N) — "한 사용자가 여러 게시글을 쓸 수 있지만, 하나의 게시글은 한 사용자에게만 속한다."
posts.user_id(외래 키)가 profiles.id를 참조하므로, 게시글 조회 시 작성자 정보를 함께 가져올 수 있고, 존재하지 않는 사용자 ID로 게시글을 만들 수 없다(참조 무결성).
8.4.2 SQL 실행 🖱️ 직접 실행
Copilot이 생성한 SQL을 Supabase 대시보드의 SQL Editor에 붙여넣고 실행한다.
왜 수동인가? — SQL Editor는 브라우저 대시보드이므로 Copilot이 직접 실행할 수 없다. Copilot이 만든 SQL을 복사 → SQL Editor에 붙여넣기 → Run 버튼 클릭으로 진행한다.
실습 안내: SQL Editor를 열고 SQL을 실행한다.
실행 후 Table Editor로 이동하면 profiles와 posts 테이블이 생성된 것을 확인할 수 있다.
