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
      profiles (
        username
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 불러오기 실패: ${error.message}`);
  }

  // 데이터 구조를 수동으로 변환하여 author 필드에 매핑
  const posts = (data as any[] || []).map(post => ({
    ...post,
    author: post.profiles
  }));

  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles (
        username
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  return {
    ...data,
    author: (data as any).profiles
  };
}

