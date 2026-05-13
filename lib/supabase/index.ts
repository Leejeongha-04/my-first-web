// 이 파일은 클라이언트 컴포넌트용 Supabase 클라이언트를 내보냅니다.
export { createClient as createBrowserClient } from './client';

// 'next/headers'를 사용하는 서버 클라이언트는 여기서 직접 내보내지 않습니다.
// 대신 사용하는 곳에서 직접 './server'를 임포트하거나, 
// 환경에 따라 동적으로 임포트해야 합니다.
