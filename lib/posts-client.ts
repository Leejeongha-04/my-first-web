import { createClient } from "@/lib/supabase/client";

export type Post = {
  id: number;
  title: string;
  body: string;
  user_id?: string;
  created_at?: string;
};

// 게시글 생성 (클라이언트 전용)
export async function createPost(post: { title: string; body: string }): Promise<Post> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: post.title,
        body: post.body,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("게시글 저장에 실패했습니다.");
  }

  return data;
}

// 게시글 삭제 (클라이언트 전용)
export async function deletePost(id: number): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}
