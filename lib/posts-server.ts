import { createClient } from "./supabase/server";

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  author?: {
    username: string | null;
  };
};

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      id, 
      title, 
      content, 
      user_id, 
      created_at,
      author:profiles!posts_user_id_fkey (
        username
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 불러오기 실패: ${error.message}`);
  }

  return (data as any) || [];
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      author:profiles!posts_user_id_fkey (
        username
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  return data;
}

