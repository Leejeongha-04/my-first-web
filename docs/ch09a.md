
Chapter 9. Supabase Authentication
Chapter 9. Supabase Authentication
챕터별로 새로운 세션으로 시작하며 아래의 프롬프트로 시작한다.  " 이 프로젝트를 검토 이해한다. 오늘은 ch9A.md 작업을 수행한다.  응답은 한국어로 하고 설명은 이해하기 쉽게 한다.  "
미션: 내 블로그(my-first-web)에 이메일/비밀번호 로그인, 회원가입, 로그아웃을 연결한다
이 장의 흐름
이번 장은 핵심 코드는 최소로 읽고, 구현은 바이브코딩으로 진행한다. 직접 손이 필요한 것은 Supabase 대시보드 설정 확인과 브라우저 테스트뿐이다.
​
단계
작업
도구
절
①
Ch8 Supabase CLI 연결 재확인
Supabase CLI
9.2
②
Email Provider, URL Configuration 확인
대시보드 (수동)
9.3
③
Ch7 컨텍스트 문서 검토
Copilot + 문서
9.4
④
인증 흐름과 파일 범위 고정
Copilot
9.5
⑤
로그인/회원가입/로그아웃 함수 작성
Copilot
9.6
⑥
로그인/회원가입 페이지 작성
Copilot
9.7
⑦
AuthProvider와 Header UI 연결
Copilot
9.8
⑧
보호 라우트 설정 (middleware.ts)
Copilot
9.9
⑨
시나리오 검증 + 빌드
브라우저 + 터미널
9.10
고정 버전 (Ch7·Ch8 교재 기준):
패키지
버전
next
16.2.1
@supabase/supabase-js
2.47.12
@supabase/ssr
0.5.2
기준 명시: 이 장의 코드·패키지 버전은 최신 npm 기준이 아니라 Ch7·Ch8 교재 기준에 맞춘다. 단, Supabase 대시보드 메뉴 경로는 2026년 5월 현재 화면 기준으로 안내한다. Ch8에서 사용한 NEXT_PUBLIC_SUPABASE_ANON_KEY 환경변수 이름도 그대로 유지한다.
학습목표
인증(Authentication)과 인가(Authorization)의 차이를 설명할 수 있다
Supabase Auth의 이메일/비밀번호 로그인을 프로젝트에 연결할 수 있다
로그인 상태를 전역 UI에서 사용할 수 있다
로그인하지 않은 사용자의 글쓰기 접근을 막을 수 있다
9.1 왜 인증인가?
Ch8에서는 더미 데이터를 Supabase 데이터베이스로 교체했다. 이제 블로그에 글을 쓰려면 누가 쓴 글인지 알아야 한다. 이것이 인증이다.
원리 — 인증(Authentication) vs 인가(Authorization)
>
| 구분 | 인증 | 인가 | | --- | --- | --- | | 질문 | "당신은 누구인가?" | "당신은 무엇을 할 수 있는가?" | | 예시 | 로그인 | 내 글만 수정 가능 | | 이 수업에서 | Ch9 | Ch11 RLS |
이번 장에서는 이메일/비밀번호 로그인만 다룬다. Google, 카카오, 네이버 로그인은 넣지 않는다. 기능을 늘리기보다 먼저 가장 단순한 인증 흐름을 끝까지 연결한다.
원리 — 세션
>
Supabase Auth는 로그인 성공 후 세션을 만든다. Next.js App Router에서는 @supabase/ssr가 쿠키 기반 세션 처리를 돕는다. 그래서 이 장의 프롬프트에는 항상 @supabase/ssr와 App Router를 명시한다.
9.2 Ch8 Supabase CLI 연결 확인 ⌨️ CLI
Ch8에서 Supabase CLI를 이미 설치하고 로그인·프로젝트 링크까지 했다. Ch9도 같은 Supabase 프로젝트를 이어서 사용하므로, 대시보드로 가기 전에 CLI 연결 상태를 먼저 확인한다.
​
my-first-web 프로젝트가 보이면 Ch8에서 만든 프로젝트를 계속 사용할 수 있다.
프로젝트 참조 ID를 확인한 뒤, Ch8에서 만든 .env.local 값과 비교한다.
​
.env.local에는 Ch8과 같은 이름을 사용한다.
​
만약 프로젝트 링크가 끊어졌거나 다른 폴더에서 작업 중이면 다시 연결한다.
​
이 절은 Ch8에서 어렵게 설치한 Supabase CLI를 재사용하는 확인 단계다. Auth Provider 설정 자체는 메뉴 확인이 더 안전하므로 다음 절에서 대시보드로 확인한다.
9.4 Ch7 기준 문서 정비와 확인 🤖 바이브코딩
Ch9는 Ch7에서 만든 AI 컨텍스트 문서를 이어서 사용한다. 새 기능을 만들기 전에 Copilot이 프로젝트 규칙, 현재 상태, 남은 할 일을 먼저 읽게 해야 한다. 이 절에서는 문서가 없으면 만들고, 이미 있으면 Ch9 기준과 충돌하는 내용을 정비한다.
문서
역할
Ch9에서 정비할 것
.github/copilot-instructions.md
코딩 규칙
App Router, Tailwind, shadcn/ui, next/navigation 규칙
context.md
현재 상태
Ch8 Supabase 연결 완료 여부, 환경변수 이름
todo.md
할 일
로그인/회원가입/글쓰기 보호 항목
ARCHITECTURE.md
프로젝트 설계
인증 후 페이지 흐름, Header 구조, 보호할 경로
AGENTS.md
여러 AI 도구 공용 규칙
Copilot 외 도구를 쓸 때 공통 기준
CLAUDE.md
Claude용 규칙
Claude Code를 함께 쓸 때 Ch7·Ch8 기준 유지
.agent/rules/project.md
Antigravity용 규칙
Antigravity를 함께 쓸 때 프로젝트 규칙 유지
실제 package.json이 교재 기준보다 최신일 수 있다. 이 경우 최신 내용을 삭제하지 말고, 문서에 교재 기준과 현재 설치 기준을 함께 남긴다.
Copilot 프롬프트 1: 기준 문서 정비
​
Ch9에서 문서에 추가할 사항
Ch9 작업이 끝나면 아래 내용을 각 문서에 남긴다.
문서
추가할 내용
.github/copilot-instructions.md
이메일/비밀번호만 사용, next/router 금지, 구버전 auth.signIn() 금지
context.md
Supabase Auth 방식, 생성한 파일, 보호 라우트, URL Configuration 설정
todo.md
회원가입, 로그인, 로그아웃, /posts/new 보호, 배포 검증 체크
ARCHITECTURE.md
인증 흐름, Header 상태 분기, 보호 라우트 목록
AGENTS.md
여러 AI 도구 공통 규칙: Ch7·Ch8 패키지 기준, Supabase 메뉴만 2026년 5월 기준
CLAUDE.md
Claude 사용 시에도 위 공통 규칙과 Ch9 인증 범위 유지
.agent/rules/project.md
Antigravity 사용 시 App Router, Supabase Auth, 보호 라우트 기준 유지
9.5 코드 변경 범위 고정 🤖 바이브코딩
9.4에서 정비한 기준 문서를 바탕으로, 이제 실제로 어떤 코드 파일을 만들고 수정할지만 확정한다. 이 절에서는 문서를 더 고치지 않고, 코드 변경 범위만 정리한다.
Copilot 프롬프트 2: 파일 범위 확인
​
Copilot 답변을 받은 뒤, 아래 필수 파일들이 포함되었는지 다시 확인시킨다.
​
9.6 인증 함수 만들기 🤖 바이브코딩
이 절에서는 lib/auth.ts만 만든다. 핵심 함수는 3개다.
lib/auth.ts는 Supabase 인증 호출을 한곳에 모아 두는 파일이다. 로그인 화면과 회원가입 화면이 Supabase API를 직접 반복해서 쓰지 않고, signInWithEmail, signUpWithEmail, signOut 같은 쉬운 이름의 함수만 호출하게 만든다. 이렇게 해 두면 나중에 에러 처리나 함수 이름이 바뀌어도 화면 파일을 많이 고치지 않아도 된다.
Copilot 프롬프트 3: lib/auth.ts
​
AI가 lib/auth.ts를 만든 뒤, 아래 패턴을 사용했는지 다시 확인시킨다.
​
9.7 로그인/회원가입 화면 만들기 🤖 바이브코딩
화면은 예쁘게 꾸미기보다 먼저 동작해야 한다. 입력칸, 버튼, 에러 메시지, 이동만 있으면 된다.
로그인 페이지와 회원가입 페이지는 사용자가 인증 기능을 실제로 만나는 입구다. 이 화면들은 Supabase 로직을 직접 길게 쓰기보다 9.6에서 만든 lib/auth.ts 함수를 호출하는 역할만 맡는다. 그래서 화면 파일은 입력값 관리, 버튼 클릭, 성공 후 이동, 실패 메시지 표시 정도로 단순하게 유지한다.
Copilot 프롬프트 4: 로그인 페이지
​
Copilot 프롬프트 5: 회원가입 페이지
​
브라우저에서 확인:
​
아래 주소를 연다.
​
9.8 로그인 상태를 전역으로 연결 🤖 바이브코딩
로그인 여부는 여러 곳에서 필요하다. Header에는 로그인/로그아웃 버튼이 필요하고, 글쓰기 페이지는 로그인 여부를 알아야 한다.
AuthProvider는 앱 전체에 “현재 로그인한 사용자” 정보를 공급하는 감싸개 컴포넌트다. contexts/AuthContext.tsx는 그 정보를 담는 React Context 파일이고, useAuth()는 여러 컴포넌트가 같은 방식으로 로그인 상태를 읽게 해 주는 Hook이다. 이 구조가 없으면 Header, 글쓰기 페이지, 로그아웃 버튼마다 Supabase 세션 확인 코드를 반복해야 한다.
이 파일이 필요한 이유는 세 가지다. 첫째, 새로고침 후에도 현재 사용자를 다시 확인한다. 둘째, 로그인/로그아웃이 일어났을 때 화면 상태를 즉시 바꾼다. 셋째, 인증 상태 확인 중에는 loading으로 처리해 버튼이나 보호 화면이 성급하게 보이지 않게 한다.
Copilot 프롬프트 6: AuthProvider
​
Copilot 프롬프트 6a: contexts/AuthContext.tsx 생성
​
AuthProvider를 만든 뒤, 인증 리스너 정리가 들어갔는지 Copilot에게 다시 확인시킨다.
​
Copilot 프롬프트 7: Header 로그인 버튼
Header는 사용자가 현재 로그인 상태를 가장 빨리 확인하는 위치다. 로그인 전에는 로그인/회원가입을 보여주고, 로그인 후에는 글쓰기/로그아웃을 보여주면 앱의 흐름이 자연스러워진다. 이 분기는 보안이 아니라 사용자 경험이다. 실제 데이터 권한은 Ch11 RLS에서 처리한다.
​
9.9 보호 라우트 만들기 🤖 바이브코딩
이번 장에서는 /posts/new만 보호해도 충분하다. /mypage가 있는 학생은 함께 보호한다.
이 장은 Ch7·Ch8 교재 흐름에 맞춰 middleware.ts로 보호 라우트를 만든다.
미들웨어란? 사용자가 페이지에 도착하기 전에 실행되는 검사 코드다. 예를 들어 비로그인 사용자가 /posts/new에 들어가려고 하면, 페이지를 보여주기 전에 먼저 /login으로 돌려보낼 수 있다.
Copilot 프롬프트 8: 미들웨어
​
미들웨어를 만든 뒤, 보호 경로와 파일 위치가 맞는지 Copilot에게 다시 확인시킨다.
​
미들웨어는 "로그인했는가?"만 확인한다. "내 글만 수정 가능한가?" 같은 권한 검사는 Ch11 RLS에서 처리한다.
9.10 검증 ⌨️ 터미널 + 브라우저
구현이 끝났다고 바로 넘어가지 않는다. 브라우저에서 아래 6개를 확인한 뒤, 결과를 Copilot에게 요약 점검시킨다.
9.10.1 브라우저 검증
번호
시나리오
기대 결과
①
/signup에서 새 계정 생성
가입 성공 또는 확인 메일 안내
②
/login에서 로그인
/posts로 이동
③
새로고침
로그인 상태 유지
④
Header의 로그아웃 클릭
로그아웃 후 로그인 버튼 표시
⑤
비로그인 상태에서 /posts/new 접속
/login으로 이동
⑥
로그인 상태에서 /posts/new 접속
글쓰기 화면 진입
​
9.10.2 터미널 검증
​
구버전 API가 섞였는지 확인:
​
민감한 키가 코드에 들어갔는지 확인:
​
두 명령을 실행한 뒤 결과를 Copilot에게 판정시킨다.
​
흔한 AI 실수
실수
증상
해결
auth.signIn() 사용
로그인 함수가 동작하지 않음
signInWithPassword() 사용
next/router 사용
App Router에서 에러
next/navigation 사용
@supabase/supabase-js로 직접 브라우저 클라이언트 생성
세션 관리 꼬임
Ch8의 lib/supabase/client.ts 사용
subscription.unsubscribe() 누락
로그인 이벤트 중복 처리
useEffect cleanup 추가
middleware.ts를 app/ 안에 생성
보호 라우트 작동 안 함
프로젝트 루트로 이동
service_role 키 사용
보안 위험
브라우저와 미들웨어에는 anon 키만
소셜 로그인까지 추가
범위 증가, 설정 실패
이번 장은 이메일/비밀번호만
위 실수 목록도 Copilot에게 점검시킨다.
​
Vercel 배포 전 확인
Ch8에서 등록한 Supabase 환경변수가 Vercel에도 있어야 한다.
먼저 Vercel CLI로 프로젝트 연결, 배포 목록, 환경변수 등록 여부를 확인한다.
​
Copilot에게 명령 실행과 판정을 함께 시킨다.
​
CLI 확인 뒤에는 사람이 대시보드에서 한 번 더 눈으로 확인한다.
Vercel 대시보드:
​
필수 값:
​
Supabase 대시보드:
​
눈으로 확인할 것:
Vercel 환경변수 이름이 정확한가?
NEXT_PUBLIC_SUPABASE_URL 값이 Ch8 Supabase 프로젝트 URL과 같은가?
NEXT_PUBLIC_SUPABASE_ANON_KEY 값이 Ch8 anon key와 같은가?
Supabase URL Configuration의 Site URL이 현재 수업 흐름과 맞는가?
환경변수나 URL 설정을 바꾼 뒤에는 다시 배포해야 한다.
​
핵심 정리 + B회차 과제 스펙
이번 시간 핵심 3가지
인증은 "누구인가?"를 확인한다. 권한 검사는 Ch11 RLS에서 다룬다.
Supabase 이메일 로그인은 signInWithPassword, 회원가입은 signUp, 로그아웃은 signOut이다.
복잡한 코드를 외우지 않는다. App Router, @supabase/ssr, 보호 경로, 검증 시나리오를 프롬프트에 정확히 넣는다.
B회차 과제 스펙
npx supabase projects list로 Ch8 프로젝트 연결 확인
npx supabase projects api-keys로 .env.local 값 재확인
Supabase 대시보드에서 Email Provider 확인
URL Configuration에서 Site URL 확인, Redirect URLs는 필요할 때만 추가
lib/auth.ts 작성
app/login/page.tsx 작성
app/signup/page.tsx 작성
AuthProvider + useAuth 작성 후 app/layout.tsx에 연결
Header에 로그인/회원가입/글쓰기/로그아웃 UI 연결
middleware.ts로 /posts/new 보호
회원가입 → 로그인 → 새로고침 유지 → 로그아웃 → 비로그인 접근 차단 테스트
npm run build 통과 후 GitHub/Vercel 배포
제출 항목
​
교사는 GitHub에서 lib/auth.ts, app/login/page.tsx, app/signup/page.tsx, contexts/AuthContext.tsx 또는 AuthProvider 파일, app/layout.tsx, Header 컴포넌트, middleware.ts를 확인한다. Vercel에서는 회원가입, 로그인, 새로고침 후 세션 유지, 로그아웃, 비로그인 /posts/new 접근 차단이 실제 배포 URL에서 동작하는지 확인한다.
제출 전 체크
​
제출 전 체크 결과도 Copilot에게 판정시킨다.
​
컨텍스트 업데이트
작업을 마칠 때 Copilot에게 붙여 넣는다.
​
참고한 공식 문서
Supabase Auth: https://supabase.com/docs/guides/auth
Supabase SSR: https://supabase.com/docs/guides/auth/server-side
Supabase Next.js Auth: https://supabase.com/docs/guides/auth/quickstarts/nextjs
Supabase Redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls
