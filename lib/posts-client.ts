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
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 삭제에 실패했습니다: ${error.message}`);
  }
}
