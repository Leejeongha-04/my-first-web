
Chapter 5. Next.js 라우팅 — 여러 페이지 만들기
미션: 블로그에 목록·상세·작성 3개 페이지를 구현하고 배포한다
학습목표
Next.js App Router의 파일 기반 라우팅 구조를 설명할 수 있다
동적 라우트([id])와 await params 패턴을 이해할 수 있다
Link 컴포넌트와 useRouter의 차이를 구분할 수 있다
AI가 생성한 라우팅 코드에서 흔한 실수를 발견할 수 있다
🤖 출발점 맞추기: ask가 아니라 agent로 되어 있는지 항상 체크
Ch3~Ch4를 거치며 각자 다른 화면을 가지고 있다. Ch5부터는 동일한 출발점에서 시작해야 같은 코드로 실습할 수 있다.
Copilot Chat(Agent 모드)에 아래 프롬프트를 입력한다:
터미널 - 새터미널 - npm run dev
http://localhost:3000 클릭
"현재 my-first-web 폴더에 app 폴더가 구성되어 있다. 이 프로젝트를 아래의 조건으로 변경해줘: 기존의 파일들을 교체해야한다.
app/page.tsx — 블로그 메인 페이지. '내 블로그'라는 제목과 간단한 소개 문구만 표시. Tailwind CSS 스타일링.
app/layout.tsx — 기본 레이아웃. html lang='ko', body 안에 nav(bg-gray-800, 흰색 텍스트, '내 블로그' 텍스트만), main(max-w-4xl mx-auto p-6으로 {children} 감싸기), footer(© 2026 내 블로그, 가운데 정렬, 회색). 아직 Link 컴포넌트 사용하지 말고 일반 텍스트로.
app/globals.css — @import 'tailwindcss' 한 줄만. 다른 스타일 모두 삭제.
기존에 다른 페이지 폴더(about, contact 등)가 있으면 삭제하지 말고 그대로 둬.
Next.js 16 App Router, Tailwind CSS 4, TypeScript."
확인

http://localhost:3000에 접속하면 내비게이션 바 + "내 블로그" 메인 + 푸터가 보이는가?

아래와 비슷한 화면인가?
​
화면이 다르더라도 nav-main-footer 3단 구조가 보이면 OK. 이후 실습에서 점차 채워나간다.
0. React와 Next.js 기초
먼저 큰 그림 보기
Ch3에서 HTML/CSS로 화면의 구조와 모양을 만들었고, Ch4에서 JavaScript로 동작을 배웠다. 이번 장부터는 React와 Next.js 위에서 실제 여러 페이지를 가진 앱을 만든다.
​
컴포넌트란
React의 핵심 아이디어: 함수가 화면을 돌려주면 컴포넌트이다.
​
렌더링 결과:
​
레고 블록처럼 작은 컴포넌트를 조립하여 화면을 구성한다.
Props — 부모가 자식에게 데이터 전달
Props는 컴포넌트에 데이터를 넘겨주는 방법이다. 함수의 매개변수와 같다.
​
렌더링 결과:
​
{ title: string; date: string } 부분은 TypeScript 타입 표기이다. AI가 자동으로 생성해주므로, "이 컴포넌트가 어떤 데이터를 받는지 명시한 것"으로 이해하면 충분하다.
부모(PostsPage)가 자식(PostCard)에게 데이터를 넘겨주는 구조:
​
실습 전 준비

프로젝트 폴더가 VS Code에서 열려 있는가?

터미널에서 npm run dev를 실행했는가?

브라우저에서 http://localhost:3000이 열리는가?

위 "출발점 맞추기"를 완료했는가?
이번 실습의 완성 목표
3개 페이지를 만들고 내비게이션으로 연결한다:
​
​
5.1 App Router — 폴더가 곧 URL
Next.js App Router의 핵심 규칙: 폴더를 만들면 URL이 된다.
파일 경로 → URL 매핑
파일 경로
URL
app/page.tsx
/
app/about/page.tsx
/about
app/posts/page.tsx
/posts
app/posts/new/page.tsx
/posts/new
app/posts/[id]/page.tsx
/posts/1, /posts/2, ...
​
규칙 3줄:
app/ 안에 폴더를 만든다 = URL 경로가 생긴다
그 폴더 안에 **page.tsx*를 만든다 = 해당 URL의 페이지가 된다
page.tsx가 없는 폴더는 URL을 만들지 않는다
page.tsx — 페이지 정의
page.tsx는 해당 URL에서 보여줄 내용을 정의한다. React 컴포넌트를 **export default**로 내보내면 된다.
​
렌더링 결과 — 브라우저에서 /posts 접속 시:
​
기억할 것:
export default function — 페이지 컴포넌트는 반드시 default export
함수 이름은 관례적으로 [경로명]Page (예: PostsPage, AboutPage)
layout.tsx — 공통 레이아웃
layout.tsx는 여러 페이지에 공통으로 적용되는 구조(내비게이션 바, 푸터 등)를 정의한다.
​
렌더링 결과 — 어떤 페이지를 열든 이 구조가 유지된다:
​
{children} 자리에 각 페이지(page.tsx)의 내용이 들어간다. 레이아웃이 "틀"이고, 페이지가 "내용"이다.
특수 파일 (참고)
파일
역할
비고
page.tsx
해당 URL의 페이지 내용
필수
layout.tsx
공통 구조 (네비, 푸터)
선택
loading.tsx
로딩 중 표시할 UI
Ch12에서 자세히
error.tsx
에러 발생 시 표시할 UI
Ch12에서 자세히
not-found.tsx
404 페이지
선택
목록 페이지 완성 코드
실제 블로그 목록 페이지를 만들면 이런 형태가 된다.
먼저 더미 데이터 파일:
​
코드 읽기 포인트:
type Post = { ... } — "게시글 데이터는 이런 모양이다"라고 정의한 설계도. 실제 데이터가 아니라 형태만 정한 것이다
Post[] — Post 배열 = "Post 여러 개가 담긴 목록"
export — 다른 파일에서 import { posts } from "@/lib/posts"로 가져다 쓸 수 있게 내보내기
개념
비유
type Post
이력서 양식 (이름, 연락처, 경력 칸)
posts: Post[]
양식대로 작성된 이력서 3장
그리고 목록 페이지:
​
렌더링 결과 — 브라우저에서 /posts 접속 시:
​
코드 읽기 포인트:
posts.map(...) — Ch4에서 배운 배열 메서드. 각 게시글을 카드로 변환한다
key={post.id} — React가 리스트 항목을 추적하는 데 필수. 없으면 경고 발생
Link href={...} — 카드 클릭 시 해당 상세 페이지로 이동
@/lib/posts — @는 프로젝트 루트를 의미하는 경로 별칭
🤖 실습: 더미 데이터 + 목록 페이지 만들기
① 더미 데이터 파일 생성
Copilot Chat(Agent 모드)에 프롬프트를 입력한다. 간단 버전 또는 상세 버전 중 선택:
현실 버전 — 초보자가 직접 쓸 수 있는 수준:
"블로그 게시글 3개의 더미 데이터 파일을 만들어줘"
시험 버전 — 결과를 정확히 맞추고 싶을 때 (복사-붙여넣기용):
"lib/posts.ts 파일을 만들어줘. 게시글 3개의 더미 데이터 배열을 export해줘.
각 게시글은 id(number), title(string), content(string), author(string), date(string) 포함.
TypeScript 타입(Post)도 함께 export."
② 목록 페이지 생성
현실 버전:
"게시글 목록을 카드로 보여주는 페이지 만들어줘. 카드 클릭하면 상세 페이지로 이동."
시험 버전:
"app/posts/page.tsx를 만들어줘. lib/posts.ts에서 posts 배열을 import하고,
게시글 목록을 카드 형태로 표시해줘. 각 카드를 클릭하면 /posts/[id]로 이동.
next/link의 Link 컴포넌트 사용. Tailwind CSS 스타일링.
Next.js 16 App Router."
검증

import Link from "next/link" — <a> 태그가 아닌 Link를 사용했는가?

posts.map(...) 안에 key={post.id}가 있는가?

lib/posts.ts에서 올바르게 import했는가?

className을 사용했는가? (class 아님)
브라우저 확인

/posts에 접속하면 카드 목록이 보이는가?

카드를 클릭하면 URL이 /posts/1 등으로 바뀌는가? (아직 404가 정상)
5.2 동적 라우트 — [id]로 상세 페이지
호텔에 비유하면: 방이 100개인 호텔에서 101호, 102호, ... 200호 문패를 각각 만들지 않는다. 대신 **"[호수]호"**라는 틀을 하나 만들면 어떤 번호든 대응할 수 있다.
웹도 마찬가지다. 블로그에 게시글이 100개면 /posts/1, /posts/2, ... /posts/100 폴더를 100개 만들 수는 없다. 동적 라우트 [id]가 이 문제를 해결한다 — 폴더 하나로 모든 번호에 대응한다.
[id] 폴더 = URL 변수
폴더 이름을 대괄호로 감싸면 동적 라우트가 된다:
​
[id]는 URL의 일부를 변수로 받겠다는 의미이다.
​
await params — Next.js 16 핵심 패턴
사용자가 /posts/42에 접속하면, Next.js는 42를 params라는 택배 상자에 담아 페이지에 전달한다. 그런데 Next.js 16에서는 이 상자가 바로 열리지 않고 "잠시 기다려야 열 수 있는 상자"(Promise)이다. 그래서 await(기다려!)를 써야 안의 값을 꺼낼 수 있다.
​
왜 await가 필요할까? 이전 버전(Next.js 14 이하)에서는 const { id } = params처럼 바로 꺼낼 수 있었다. Next.js 15부터 params가 Promise로 바뀐 이유는 페이지를 더 빨리 보여주기 위해서다. 택배 비유를 이어가면 — 택배가 도착하기 전에도 집 안 청소(페이지 껍데기 렌더링)를 먼저 시작할 수 있게 된 것이다. 택배(params)가 도착하면 그때 상자를 열어서(await) 내용물을 확인한다.
동적 라우트 페이지에서 URL 파라미터를 읽는 코드:
​
렌더링 결과 — /posts/1 접속 시:
​
⚠️ Next.js 16 주의: params는 Promise로 전달된다. 반드시 await로 꺼내야 한다. AI가 const { id } = params (await 없음)로 생성하면 현재 버전과 맞지 않는다.
코드 읽기 포인트:
async function — await를 쓰려면 함수 앞에 async 필요
const { id } = await params — Ch4에서 배운 구조 분해 할당을 비동기에 적용
posts.find(...) — Ch4에서 배운 배열 메서드. 조건에 맞는 첫 번째 항목을 반환
Number(id) — params의 id는 항상 문자열이므로 숫자로 변환 필요
if (!post) — 게시글이 없을 때 처리. 실전에서 매우 중요
🤖 실습: 상세 페이지 만들기
Copilot Chat(Agent 모드):
현실 버전:
"게시글 번호를 클릭하면 내용을 보여주는 상세 페이지 만들어줘. 목록으로 돌아가기 링크도 넣어줘."
시험 버전:
"app/posts/[id]/page.tsx를 만들어줘. Next.js 16 App Router이므로 params를 await해서 id를 추출해줘.
lib/posts.ts에서 해당 id의 게시글을 find로 찾아 표시. 없으면 '게시글을 찾을 수 없습니다' 메시지 표시.
목록으로 돌아가기 Link 포함. Tailwind CSS 사용."
검증

const { id } = await params — await가 있는가? (가장 중요!)

posts.find(...) 로 해당 게시글을 찾는가?

게시글이 없을 때 안내 메시지가 표시되는가?

목록으로 돌아가는 <Link href="/posts">가 있는가?
브라우저 확인

/posts/1에 접속하면 게시글 내용이 보이는가?

/posts/999에 접속하면 "찾을 수 없습니다" 메시지가 보이는가?

"목록으로" 클릭하면 /posts로 돌아가는가?
5.3 내비게이션 — Link와 useRouter
여러 페이지를 만들었으니 페이지 사이를 이동하는 방법이 필요하다.
Link 컴포넌트 — 클릭으로 이동
Next.js의 Link는 HTML의 <a> 태그와 비슷하지만, 페이지 전체를 다시 로드하지 않고 필요한 부분만 업데이트한다.
항목
<Link href="...">
<a href="...">
페이지 전환
필요한 부분만 업데이트 (빠름)
전체 새로고침 (느림)
레이아웃 유지
유지됨
다시 렌더링
import 필요
import Link from "next/link"
불필요
용도
앱 내부 페이지 이동
외부 URL 이동
AI가 앱 내부 링크에 <a href="...">를 사용하면 대표적인 실수이다. Next.js에서 내부 이동은 항상 <Link>를 사용한다.
useRouter — 코드로 이동
<Link>는 사용자가 직접 클릭해서 이동하는 "문"이다. 그런데 글을 다 쓰고 저장 버튼을 누르면? 저장 처리가 끝난 뒤 코드가 알아서 목록 페이지로 보내줘야 한다. 이렇게 사용자가 클릭하는 게 아니라 프로그램이 자동으로 이동시킬 때 useRouter를 사용한다. 비유하면 — <Link>는 손님이 직접 여는 자동문, useRouter는 안내 로봇이 손님을 데려가는 에스코트이다.
useRouter의 이름에서 use가 눈에 띈다. React에서 use로 시작하는 함수는 전부 Hook(훅)이라고 부른다 — useState, useEffect, useRouter 등. React가 제공하는 특수 기능을 컴포넌트에 "걸어두는(hook)" 도구이다. Hook이므로 두 가지 규칙을 따른다:
"use client" 필수 — Hook은 브라우저에서 동작하므로 파일 맨 위에 선언 필요
​
렌더링 결과 — /posts/new 접속 시:
​
