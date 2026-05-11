export type Post = {
  id: number;
  title: string;
  body: string;
  user_id?: string;
  created_at?: string;
};

// 게시글 목록 가져오기
export async function getPosts(): Promise<Post[]> {
  const { createClient } = await import("@/lib/supabase/server");
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

// 특정 게시글 가져오기
export async function getPost(id: string): Promise<Post> {
  const { createClient } = await import("@/lib/supabase/server");
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

// 게시글 생성
export async function createPost(post: { title: string; body: string }): Promise<Post> {
  const { createClient } = await import("@/lib/supabase/client");
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

// 게시글 삭제
export async function deletePost(id: number): Promise<void> {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}


