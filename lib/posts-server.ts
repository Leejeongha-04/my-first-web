import { createClient } from "./supabase/server";

export type Post = {
  id: number;
  title: string;
  body: string;
  user_id?: string;
  userId?: string;
  created_at?: string;
};

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, content, user_id, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error Details:", error);
    throw new Error(`게시글 불러오기 실패: ${error.message}`);
  }

  return (data || []).map(post => ({
    id: post.id,
    title: post.title,
    body: post.content,
    userId: post.user_id,
    created_at: post.created_at
  }));
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  return {
    ...data,
    userId: data.user_id
  };
}
