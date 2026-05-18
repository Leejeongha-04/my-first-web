import { createClient } from "./supabase/client";

export type CreatePostInput = {
  title: string;
  content: string;
  user_id: string;
};

export async function createPost(post: CreatePostInput): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: post.title,
        content: post.content,
        user_id: post.user_id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 저장에 실패했습니다: ${error.message}`);
  }

  return data;
}

export async function updatePost(id: string, post: { title: string; content: string }): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({
      title: post.title,
      content: post.content,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 수정에 실패했습니다: ${error.message}`);
  }

  return data;
}

export async function deletePost(id: string): Promise<void> {
  const supabase = createClient();
  // { count: 'exact' }를 추가하여 실제로 지워졌는지 확인합니다.
  const { error, count } = await supabase
    .from("posts")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 삭제에 실패했습니다: ${error.message}`);
  }

  // 만약 에러는 없는데 지워진 행(count)이 0이라면 RLS 권한 문제일 확률이 매우 높습니다.
  if (count === 0) {
    throw new Error("삭제 권한이 없거나 이미 삭제된 게시글입니다.");
  }
}
