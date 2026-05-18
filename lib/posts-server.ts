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

  // 1단계: 게시글 목록 가져오기
  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select("id, title, content, user_id, created_at")
    .order("created_at", { ascending: false });

  if (postsError) {
    console.error("Supabase Error (posts):", postsError);
    throw new Error(`게시글 불러오기 실패: ${postsError.message}`);
  }

  if (!postsData || postsData.length === 0) return [];

  // 2단계: 게시글 작성자들의 프로필 정보 가져오기 (Relationship 에러 회피를 위한 수동 조인)
  const userIds = Array.from(new Set(postsData.map((p) => p.user_id)));
  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  if (profilesError) {
    console.error("Supabase Error (profiles):", profilesError);
    // 프로필을 못 가져와도 게시글은 보여주기 위해 에러를 던지지 않고 빈 배열 처리 가능
  }

  // 3단계: 데이터 수동 매핑
  const profilesMap = new Map(profilesData?.map((p) => [p.id, p]) || []);
  
  const posts = postsData.map((post) => ({
    ...post,
    author: profilesMap.get(post.user_id) || { username: "알 수 없는 사용자" },
  }));

  return posts;
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  
  // 1단계: 특정 게시글 가져오기
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (postError) {
    console.error("Supabase Error (post):", postError);
    throw new Error("게시글을 찾을 수 없습니다.");
  }

  // 2단계: 해당 게시글의 작성자 프로필 가져오기
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", postData.user_id)
    .single();

  if (profileError) {
    console.warn("Supabase Warning (profile):", profileError);
    // 프로필 정보가 없어도 게시글은 보여줄 수 있도록 기본값 반환
  }

  return {
    ...postData,
    author: {
      username: profileData?.username || "익명"
    }
  };
}
    author: profileData || { username: "알 수 없는 사용자" },
  };
}

