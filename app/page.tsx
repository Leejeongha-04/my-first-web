const Home = () => {
  const posts = [
    {
      id: 1,
      title: "Next.js 15와 React 19 시작하기",
      description: "App Router와 서버 컴포넌트를 활용한 현대적인 웹 개발 경험을 공유합니다.",
      author: "작성자",
      date: "2026-03-30",
    },
    {
      id: 2,
      title: "Tailwind CSS 4.0의 새로운 기능",
      description: "더 빠르고 강력해진 Tailwind CSS 4.0으로 스타일링하는 방법을 알아봅니다.",
      author: "작성자",
      date: "2026-03-29",
    },
    {
      id: 3,
      title: "AI와 함께하는 바이브 코딩",
      description: "GitHub Copilot과 함께 효율적으로 코드를 작성하는 팁과 노하우를 소개합니다.",
      author: "작성자",
      date: "2026-03-28",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">내 블로그</h1>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">홈</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">포스트</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">소개</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 p-4">
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col rounded-lg bg-white p-6 shadow transition hover:shadow-lg dark:border dark:border-zinc-800 dark:bg-zinc-950"
            >
              <time className="text-sm text-gray-400">{post.date}</time>
              <h2 className="mt-2 text-lg font-bold text-zinc-900 line-clamp-2 dark:text-zinc-50">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-gray-600 line-clamp-3 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500 dark:text-zinc-500">{post.author}</span>
                <span className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  더 읽기 &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t bg-white p-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl">
          &copy; 2026 내 블로그. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;

