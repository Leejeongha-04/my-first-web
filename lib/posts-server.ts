import { createClient } from "@/lib/supabase/server";

export type Post = {
  id: number;
  title: string;
  body: string;
  user_id?: string;
  created_at?: string;
};

// 게시글 목록 가져오기 (서버 전용)
export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  return data || [];
}

// 특정 게시글 가져오기 (서버 전용)
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

  return data;
}
