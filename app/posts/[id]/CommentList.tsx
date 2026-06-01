import { getComments } from "@/lib/posts-server";
import { createClient } from "@/lib/supabase/server";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await getComments(postId);
  
  // 현재 로그인한 사용자 정보 가져오기
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold mb-6">
        댓글 {comments.length}
      </h3>
      
      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-10 text-center">
          첫 번째 댓글을 남겨보세요!
        </p>
      ) : (
        <div className="bg-card rounded-xl border p-6 divide-y">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              currentUserId={user?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
