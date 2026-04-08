> **미션**: 블로그에 인터랙션을 더한다 — 상태 관리와 데이터 페칭으로 동적 UI를 만든다
> 

---

## 학습목표

1. useState로 컴포넌트의 상태를 관리하고 이벤트를 처리할 수 있다
2. useEffect로 사이드 이펙트를 처리하고 의존성 배열의 역할을 설명할 수 있다
3. Server Component와 Client Component의 차이를 이해하고 적절히 선택할 수 있다
4. 서버/클라이언트 양쪽의 데이터 페칭 패턴을 구현할 수 있다
5. Context API로 전역 상태를 관리하고 커스텀 훅으로 로직을 재사용할 수 있다

---

---

## 오늘의 미션 + 빠른 진단

> **오늘의 질문**: "Ch5에서 만든 블로그은 정적이다. 검색을 입력해도, 글을 써도 아무 반응이 없다. 어떻게 하면 '동적'으로 만들 수 있을까?"
> 

**빠른 진단** (1문항):

다음 코드에서 버튼을 클릭하면 화면에 어떤 일이 발생하는가?

```jsx
let count = 0;
function handleClick() {
  count = count + 1;
}
return <button onClick={handleClick}>{count}</button>;
```

- (A) 버튼의 숫자가 1씩 증가한다

- (B) 아무 변화가 없다

- (C) 에러가 발생한다

정답: (B) — 일반 변수를 바꿔도 React는 화면을 다시 그리지 않는다. `useState`가 필요하다.

---

## 6.1 useState와 이벤트 처리

Ch5에서 블로그의 페이지 구조를 만들었다. 목록, 상세, 작성 페이지가 있지만 아직 "동작"이 없다. 검색을 입력해도 반응이 없고, 글을 써도 저장되지 않는다. 이 장에서 **상태**(State)와 **이벤트**(Event)를 배워 블로그에 생명을 불어넣는다.

### 6.1.1 상태의 개념과 useState

Ch5에서 배운 Props는 **읽기 전용**이었다. 부모가 전달한 데이터를 표시할 수만 있고, 변경할 수 없었다. **상태**(State)는 컴포넌트가 스스로 **기억하고 변경할 수 있는 데이터**이다.

```jsx
"use client";

import { useState } from "react";

function LikeButton() {
  const [count, setCount] = useState(0);
  // count = 현재 값, setCount = 값을 바꾸는 함수, 0 = 초기값

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ❤️ {count}
    </button>
  );
}
```

> **라이브 코딩 시연**: 위 좋아요 버튼을 브라우저에서 클릭하며 숫자가 증가하는 것을 보여준다. "버튼을 클릭할 때마다 React가 화면을 다시 그린다"는 점을 강조한다.
> 

일반 변수(`let count = 0`)로는 이것이 불가능하다. `let`을 바꿔도 React는 화면을 다시 그리지 않는다.

**표 6.2** 일반 변수 vs useState

| 항목 | `let count = 0` | `useState(0)` |
| --- | --- | --- |
| 화면 업데이트 | 안 됨 | 자동으로 다시 렌더링 |
| "use client" 필요 | 아니오 | **예** |

`useState`는 **React Hook**이다. Hook은 `use`로 시작하는 특별한 함수이며, 컴포넌트에 기능을 "연결"(hook)한다. Hook을 사용하는 컴포넌트는 반드시 `"use client"` 파일이어야 한다.

### 6.1.2 이벤트 핸들러 작성

사용자의 동작(클릭, 입력, 폼 제출)에 반응하려면 **이벤트 핸들러**(Event Handler)를 연결한다:

```jsx
"use client";

import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // 페이지 새로고침 방지
    alert(`검색어: ${query}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
        className="flex-1 px-3 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        검색
      </button>
    </form>
  );
}
```

**표 6.3** 주요 이벤트 핸들러

| 이벤트 | 발생 시점 | 주요 용도 |
| --- | --- | --- |
| `onChange` | 입력값 변경 시 | input, select, textarea |
| `onKeyDown` | 키보드 키 누를 때 | 단축키, Enter 검색 |

이벤트 핸들러의 명명 규칙: `handle` + 이벤트 이름 (예: `handleClick`, `handleChange`, `handleSubmit`). AI가 생성한 코드에서 이 패턴이 보이면 이벤트 처리 코드임을 알 수 있다.

### 6.1.3 폼 입력 처리

게시글 작성 폼처럼 여러 입력 필드가 있을 때는 **객체 상태**로 관리한다. 이런 방식을 **제어 컴포넌트**(Controlled Component)라 부른다 — 입력값을 React state가 "제어"한다:

```jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // 해당 필드만 업데이트
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력해주세요");
      return;
    }

    // Ch8에서 Supabase insert로 교체 예정
    alert("게시글이 저장되었습니다 (더미)");
    router.push("/posts");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
        className="w-full px-3 py-2 border rounded text-lg"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
        rows={10}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        작성하기
      </button>
    </form>
  );
}
```

**코드 읽기 포인트**:

- `setForm({ ...form, [name]: value })` — Ch4에서 배운 스프레드 연산자로 **불변성 유지**

- `[name]: value` — 대괄호 안의 변수가 키 이름이 됨 (Ch4 계산된 프로퍼티)

- `e.preventDefault()` — 폼 제출 시 페이지 새로고침 방지

- `form.title.trim()` — 공백만 있는 제목 방지

### 6.1.4 상태 업데이트와 불변성

React에서 상태를 업데이트할 때는 **기존 상태를 직접 수정하면 안 된다**. 새로운 값을 만들어서 교체해야 한다. 이것을 **불변성**(Immutability)이라 한다:

```jsx
// ❌ 직접 수정 (React가 변경을 감지하지 못함)
posts.push(newPost);          // 배열 끝에 추가
posts[0].title = "새 제목";    // 객체 속성 변경
posts.splice(0, 1);           // 배열 항목 삭제

// ✅ 새 배열/객체를 만들어 교체
setPosts([...posts, newPost]);                             // 추가
setPosts(posts.map(p => p.id === id ? { ...p, title: "새 제목" } : p)); // 수정
setPosts(posts.filter(p => p.id !== id));                  // 삭제
```

> [ubc84uc804 uace0uc815] Next.js 14.2.21, React 18.3.1, Tailwind CSS 3.4.17, @supabase/supabase-js 2.47.12, @supabase/ssr 0.5.2 uae30uc900uc73cub85c uc791uc131ud574uc918.
> 

> [uaddcuce59] App Routerub9cc uc0acuc6a9ud558uace0 next/router, pages router, uad6cubc84uc804 APIub294 uc0acuc6a9ud558uc9c0 ub9c8.
> 

> [uac80uc99d] ubd88ud655uc2e4ud558uba74 ud604uc7ac ud504ub85cuc81dud2b8 package.json uae30uc900uc73cub85c ubc84uc804uc744 uba3cuc800 ud655uc778ud558uace0 ub2f5ud574uc918.
> 

> "Reactuc5d0uc11c posts ubc30uc5f4 stateub97c ubd88ubcc0uc131uc744 uc720uc9c0ud558uba74uc11c ucd94uac00, uc218uc815, uc0aduc81cud558ub294 ucf54ub4dcub97c ubcf4uc5ecuc918. uc2a4ud504ub808ub4dc uc5f0uc0b0uc790uc640 map/filter uc0acuc6a9. push, splice uac19uc740 uc9c1uc811 uc218uc815uc740 ud558uc9c0 ub9c8."
> 

이 패턴은 Ch10에서 Supabase CRUD와 연결할 때 다시 등장한다. 서버에서 데이터를 추가/수정/삭제한 후, 로컬 state도 같은 방식으로 업데이트한다.

---

## 6.2 useEffect와 사이드 이펙트

### 6.2.1 useEffect 기본 사용법

**사이드 이펙트**(Side Effect)는 렌더링 이외의 작업이다: API 호출, 타이머 설정, 외부 라이브러리 초기화 등. **`useEffect`**는 컴포넌트가 화면에 나타난 후 사이드 이펙트를 실행한다:

```jsx
"use client";

import { useState, useEffect } from "react";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컴포넌트가 화면에 나타난 후 실행
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []); // 빈 배열 = 첫 렌더링 시 1회만 실행

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.id} className="p-3 border rounded">{post.title}</li>
      ))}
    </ul>
  );
}
```

### 6.2.2 의존성 배열

`useEffect`의 두 번째 인자인 **의존성 배열**(Dependency Array)이 실행 시점을 결정한다:

**표 6.4** 의존성 배열에 따른 실행 시점

| 의존성 배열 | 실행 시점 | 용도 | `[]` (빈 배열) | 마운트 시 **1회** | API 초기 호출, 구독 설정 |
| --- | --- | --- | --- | --- | --- |
| `[query]` | `query` 변경 시마다 | 검색어 변경 시 재검색 | 생략 | **매 렌더링마다** | 거의 사용하지 않음 (성능 문제) |

```jsx
// 검색어가 바뀌다 때마다 API 호출
useEffect(() => {
  if (query.length > 0) {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }
}, [query]); // query가 변경될 때마다 실행
```

### 6.2.3 클린업 함수

useEffect에서 `return`하는 함수는 **클린업**(Cleanup) 함수이다. 컴포넌트가 사라지거나 effect가 다시 실행되기 전에 호출된다:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("1초마다 실행");
  }, 1000);

  return () => clearInterval(timer); // 컴포넌트 제거 시 타이머 해제
}, []);
```

클린업을 하지 않으면 메모리 누수가 발생한다. AI가 `setInterval`이나 이벤트 리스너를 사용하면서 클린업 함수를 빠뜨리는지 확인해야 한다.

> **⚠️ AI 주의사항**: Copilot은 useEffect 안에서 setInterval이나 addEventListener를 사용하면서 클린업 함수를 빠뜨리는 경우가 많다. return 문이 있는지 반드시 확인한다.
> 

---

## 6.3 Server Component vs Client Component

이것은 Next.js App Router에서 **가장 중요한 개념**이다. Ch5에서 `"use client"`를 몇 번 사용했는데, 이제 정확히 이해할 차례이다.

### 6.3.1 "use client" 지시어

Next.js App Router에서 모든 컴포넌트는 기본적으로 **서버 컴포넌트**(Server Component)이다. 서버에서 실행되어 HTML을 생성한 후 브라우저에 전송한다. 브라우저에서 인터랙션(클릭, 입력)이 필요하면 파일 맨 위에 `"use client"`를 추가하여 **클라이언트 컴포넌트**(Client Component)로 전환한다:

```jsx
// 서버 컴포넌트 (기본) — "use client" 없음
export default async function PostsPage() {
  const posts = await fetchPosts(); // 서버에서 직접 데이터 가져옴
  return <PostList posts={posts} />;
}

// 클라이언트 컴포넌트 — "use client" 있음
"use client";
function PostList({ posts }) {
  const [query, setQuery] = useState(""); // useState 사용 가능
  // ...
}
```

### 6.3.2 언제 서버 컴포넌트를 쓰는가

- 데이터를 가져오기만 하고 사용자 인터랙션이 없을 때

- API 키나 데이터베이스에 직접 접근할 때 (보안)

- 큰 라이브러리를 사용할 때 (브라우저에 보내는 코드 양 감소)

### 6.3.3 언제 클라이언트 컴포넌트를 쓰는가

- `useState`, `useEffect`, `useRouter` 같은 **Hook**을 사용할 때

- `onClick`, `onChange` 같은 **이벤트 핸들러**가 필요할 때

- 브라우저 API(localStorage, window)를 사용할 때

**표 6.5** Server Component vs Client Component

| 항목 | Server Component | Client Component | 선언 | 기본 (아무것도 안 씀) | `"use client"` 파일 맨 위 |
| --- | --- | --- | --- | --- | --- |
| 실행 위치 | 서버 | 브라우저 (+ 서버 초기 렌더링) | useState/useEffect | 사용 불가 | 사용 가능 |
| onClick/onChange | 사용 불가 | 사용 가능 | async/await | 컴포넌트 자체에서 가능 | 컴포넌트 자체에서 불가 |
| 데이터베이스 접근 | 가능 (보안) | 불가 (Supabase 클라이언트 제외) | 번들 크기 | 브라우저에 포함 안 됨 | 브라우저에 포함됨 |