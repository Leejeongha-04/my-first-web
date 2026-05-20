<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Ch11 RLS Rules
- 보안은 클라이언트 if문이 아니라 RLS로 강제한다.
- RLS SQL은 반드시 마이그레이션 파일로 기록한다.
- `service_role` 키는 클라이언트(브라우저)에서 절대 사용하지 않는다.
<!-- END:nextjs-agent-rules -->
