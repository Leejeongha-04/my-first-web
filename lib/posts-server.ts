import { createClient } from "./supabase/server";

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category: string;
  created_at: string;
  author?: {
    username: string | null;
  };
};

export async function getPosts(category?: string): Promise<Post[]> {
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("id, title, content, user_id, category, created_at");
  
  if (category) {
    query = query.eq("category", category);
  }

  const { data: postsData, error: postsError } = await query.order("created_at", { ascending: false });

  if (postsError) {
    console.error("Supabase Error (posts):", postsError);
    throw new Error(postsError.message);
  }

  if (!postsData || postsData.length === 0) return [];

  const userIds = Array.from(new Set(postsData.map((p) => p.user_id)));
  const { data: profilesData } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  const profilesMap = new Map(profilesData?.map((p) => [p.id, p]) || []);
  
  return postsData.map((post) => ({
    ...post,
    author: {
      username: profilesMap.get(post.user_id)?.username || "익명"
    },
  }));
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (postError) {
    console.error("Supabase Error (post):", postError);
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", postData.user_id)
    .single();

  return {
    ...postData,
    author: {
      username: profileData?.username || "익명"
    }
  };
}

