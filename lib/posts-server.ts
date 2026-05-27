import { createClient } from "./supabase/server";

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category: string;
  image_url?: string;
  image_urls?: string[];
  created_at: string;
  author?: {
    username: string | null;
  };
};

export async function getPosts(category?: string): Promise<Post[]> {
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*");
  
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
  
  // 캐시 우회를 위해 개별 게시글 조회 시 정렬 및 select 최적화
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (postError) {
    console.error("Supabase Error (post):", postError);
    throw new Error(`DB 에러: ${postError.message}`);
  }
  
  if (!postData) {
    // 404가 간헐적으로 발생하는 경우를 위해 로깅 추가
    console.error(`게시글을 찾을 수 없음. ID: ${id}`);
    throw new Error(`게시글을 찾을 수 없습니다. (ID: ${id})`);
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", postData.user_id)
    .maybeSingle();

  return {
    ...postData,
    author: {
      username: profileData?.username || "익명"
    }
  };
}

