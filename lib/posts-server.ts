import { createClient } from "./supabase/server";

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category: string;
  image_url?: string;
  image_urls?: string[];
  views: number;
  likes_count: number;
  is_liked: boolean;
  created_at: string;
  author?: {
    username: string | null;
  };
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author?: {
    username: string | null;
    avatar_url: string | null;
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

  const postIds = postsData.map(p => p.id);

  // 좋아요 개수 가져오기 (Relationship 에러 방지를 위해 별도 쿼리)
  let likesCountsMap: Map<string, number> = new Map();
  try {
    const { data: likesData } = await supabase
      .from("likes")
      .select("post_id");
    
    if (likesData) {
      likesData.forEach(like => {
        const count = likesCountsMap.get(like.post_id) || 0;
        likesCountsMap.set(like.post_id, count + 1);
      });
    }
  } catch (err) {
    console.error("Error fetching likes counts:", err);
  }

  const userIds = Array.from(new Set(postsData.map((p) => p.user_id)));
  const { data: profilesData } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);

  const profilesMap = new Map(profilesData?.map((p) => [p.id, p]) || []);

  const { data: { user } } = await supabase.auth.getUser();
  
  // 현재 사용자가 좋아요를 누른 게시글들 가져오기 (배치 처리)
  let likedPostIds: Set<string> = new Set();
  try {
    if (user) {
      const { data: userLikes } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", user.id)
        .in("post_id", postsData.map(p => p.id));
      
      if (userLikes) {
        likedPostIds = new Set(userLikes.map(l => l.post_id));
      }
    }
  } catch (err) {
    console.error("Error fetching liked IDs:", err);
  }
  
  return postsData.map((post) => ({
    ...post,
    likes_count: likesCountsMap.get(post.id) || 0,
    is_liked: likedPostIds.has(post.id),
    author: {
      username: profilesMap.get(post.user_id)?.username || "익명"
    },
  }));
}

export async function getPost(id: string): Promise<Post> {
  const supabase = await createClient();
  
  // 조회수 증가 업데이트 (Security Definer RPC 사용)
  // RLS 정책으로 인해 일반 update는 작성자만 가능하므로 RPC가 필수입니다.
  const { error: rpcError } = await supabase.rpc("increment_views", { post_id: id });
  
  if (rpcError) {
    console.error("Failed to increment views:", rpcError);
    // 조회수 증가 실패가 전체 페이지 로딩을 막지 않도록 에러만 출력하고 진행합니다.
  }
  
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

  // 좋아요 정보 가져오기
  let likesCount = 0;
  let isLiked = false;
  
  try {
    const { count } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", id);
    likesCount = count || 0;

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: likeData } = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", id)
        .eq("user_id", user.id)
        .maybeSingle();
      isLiked = !!likeData;
    }
  } catch (err) {
    console.error("Error fetching likes info:", err);
  }

  return {
    ...postData,
    likes_count: likesCount,
    is_liked: isLiked,
    author: {
      username: profileData?.username || "익명"
    }
  };
}

export async function getComments(postId: string): Promise<Comment[]> {
  const supabase = await createClient();

  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (commentsError) {
    console.error("Supabase Error (comments):", commentsError.message, commentsError.details);
    return [];
  }

  if (!commentsData || commentsData.length === 0) return [];

  const userIds = Array.from(new Set(commentsData.map((c) => c.user_id)));
  const { data: profilesData } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", userIds);

  const profilesMap = new Map(profilesData?.map((p) => [p.id, p]) || []);

  return commentsData.map((comment) => ({
    ...comment,
    author: {
      username: profilesMap.get(comment.user_id)?.username || "익명",
      avatar_url: profilesMap.get(comment.user_id)?.avatar_url || null,
    },
  }));
}

