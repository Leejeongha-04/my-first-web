// type = "게시글 데이터는 이런 모양이다"라고 정의 (AI가 자동 생성)
export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// 게시글 목록 가져오기
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
}

// 특정 게시글 가져오기
export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("게시글을 찾을 수 없습니다.");
  return res.json();
}

// 게시글 생성 (Mock)
export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  if (!res.ok) throw new Error("게시글 저장에 실패했습니다.");
  return res.json();
}

// 게시글 삭제 (Mock)
export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("게시글 삭제에 실패했습니다.");
}

