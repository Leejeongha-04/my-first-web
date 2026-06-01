import { createClient } from "./supabase/client";

export type CreatePostInput = {
  title: string;
  content: string;
  user_id: string;
  category?: string;
  image_urls?: string[];
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

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `post/${fileName}`;

  const { data, error } = await supabase.storage
    .from('post_images')
    .upload(filePath, file);

  if (error) {
    throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('post_images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function createPost(post: CreatePostInput): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: post.title,
        content: post.content,
        user_id: post.user_id,
        category: post.category || '보관소',
        image_urls: post.image_urls || [],
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 저장에 실패했습니다: ${error.message}`);
  }

  return data;
}

export async function updatePost(id: string, post: { title: string; content: string; category?: string; image_urls?: string[] }): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .update({
      title: post.title,
      content: post.content,
      category: post.category,
      image_urls: post.image_urls,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 수정에 실패했습니다: ${error.message}`);
  }

  return data;
}

export async function deletePost(id: string): Promise<void> {
  const supabase = createClient();
  // { count: 'exact' }를 추가하여 실제로 지워졌는지 확인합니다.
  const { error, count } = await supabase
    .from("posts")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`게시글 삭제에 실패했습니다: ${error.message}`);
  }

  // 만약 에러는 없는데 지워진 행(count)이 0이라면 RLS 권한 문제일 확률이 매우 높습니다.
  if (count === 0) {
    throw new Error("삭제 권한이 없거나 이미 삭제된 게시글입니다.");
  }
}

export async function createComment(postId: string, userId: string, content: string): Promise<any> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        user_id: userId,
        content: content,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase Error (createComment):", error.message, error.details, error.hint);
    throw new Error(`댓글 작성에 실패했습니다: ${error.message}`);
  }

  return data;
}

export async function deleteComment(commentId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(`댓글 삭제에 실패했습니다: ${error.message}`);
  }
}

export async function toggleLike(postId: string, userId: string, isCurrentlyLiked: boolean): Promise<void> {
  const supabase = createClient();

  if (isCurrentlyLiked) {
    // 좋아요 취소
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase Error (unlike):", error);
      const message = error.code === 'PGRST116' || error.message?.includes('relation "likes" does not exist')
        ? "좋아요 기능을 사용하려면 데이터베이스에 'likes' 테이블이 생성되어야 합니다. 마이그레이션을 실행해 주세요."
        : error.message;
      throw new Error(`좋아요 취소에 실패했습니다: ${message}`);
    }
  } else {
    // 좋아요 추가
    const { error } = await supabase
      .from("likes")
      .insert([
        {
          post_id: postId,
          user_id: userId,
        },
      ]);

    if (error) {
      console.error("Supabase Error (like):", error);
      const message = error.code === 'PGRST116' || error.message?.includes('relation "likes" does not exist')
        ? "좋아요 기능을 사용하려면 데이터베이스에 'likes' 테이블이 생성되어야 합니다. 마이그레이션을 실행해 주세요."
        : error.message;
      throw new Error(`좋아요 실패했습니다: ${message}`);
    }
  }
}
