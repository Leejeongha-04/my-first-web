import { test, expect } from '@playwright/test';

// 환경 변수 검증 (CI/CD 또는 로컬 실행 시 필요)
const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

test.describe('인증 및 게시글 CRUD 테스트', () => {
  
  test('테스트 1 — 행복 경로: 로그인, 글 작성, 목록 확인', async ({ page }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      test.skip(true, 'Environment variables TEST_EMAIL and TEST_PASSWORD are required');
      return;
    }

    // 1. /login에서 로그인
    await page.goto('/login');
    await page.getByLabel('이메일').fill(TEST_EMAIL);
    await page.getByLabel('비밀번호').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: '로그인', exact: true }).click();

    // 로그인 완료 대기 (홈페이지로 이동 확인)
    await expect(page).toHaveURL('/');

    // 2. /posts/new에서 게시글 작성
    await page.goto('/posts/new');
    
    const postTitle = `E2E 테스트 제목 ${Date.now()}`;
    const postContent = 'E2E 테스트 내용입니다. 자동으로 생성된 게시글입니다.';

    await page.getByLabel('제목').fill(postTitle);
    await page.getByLabel('내용').fill(postContent);
    await page.getByRole('button', { name: '저장하기', exact: true }).click();

    // 저장 완료 다이얼로그 확인 및 상세 페이지 이동
    await expect(page.getByText('글이 성공적으로 게시되었습니다!')).toBeVisible();
    await page.getByRole('button', { name: '확인', exact: true }).click();

    // 3. /posts 목록에서 새 글 제목 확인
    await page.goto('/posts');
    await expect(page.getByText(postTitle)).toBeVisible();
  });

  test('테스트 2 — 거절 경로: 비로그인 상태에서 작성 페이지 접근 시 로그인 리다이렉트', async ({ page }) => {
    // 1. 로그아웃 상태 보장을 위해 새 브라우저 컨텍스트 (이미 기본적으로 독립적)
    // 2. /posts/new 접속
    await page.goto('/posts/new');

    // 3. /login으로 리다이렉트되는지 확인
    // baseURL이 포함된 전체 URL 또는 경로 패턴 확인
    await expect(page).toHaveURL(/\/login/);
  });
});
