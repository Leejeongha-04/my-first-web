export function getErrorMessage(error: any): string {
  if (!error) return "알 수 없는 오류가 발생했습니다.";

  const message = error.message || String(error);

  // Supabase Auth 관련 에러
  if (message.includes("Invalid login credentials")) {
    return "이메일 또는 비밀번호가 일치하지 않습니다.";
  }
  if (message.includes("User already registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (message.includes("Password should be at least 6 characters")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (message.includes("Email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  if (message.includes("Database error saving new user")) {
    return "사용자 등록 중 DB 오류가 발생했습니다.";
  }

  // Supabase Database/RLS 관련 에러
  if (message.includes("new row violates row-level security policy")) {
    return "권한이 없습니다 (보안 정책 위반).";
  }
  if (message.includes("violates foreign key constraint")) {
    return "관련된 데이터가 존재하여 삭제할 수 없거나 잘못된 참조입니다.";
  }

  // 공통적인 HTTP 또는 네트워크 에러
  if (message.includes("Failed to fetch")) {
    return "서버와 연결할 수 없습니다. 네트워크 상태를 확인해주세요.";
  }

  return message || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
