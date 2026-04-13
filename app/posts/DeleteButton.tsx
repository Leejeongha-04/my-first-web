"use client";

import { deletePost } from "@/lib/posts";

type DeleteButtonProps = {
  id: number;
  onDelete: (id: number) => void;
};

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        onDelete(id);
        alert("삭제되었습니다.");
      } catch (error) {
        alert("삭제에 실패했습니다.");
        console.error(error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
    >
      삭제
    </button>
  );
}
