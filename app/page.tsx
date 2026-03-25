const Home = () => {
  const posts = [
    {
      id: 1,
      title: "첫 번째 블로그 포스트",
      description: "Next.js와 Tailwind CSS를 이용해 블로그를 만들기 시작했습니다.",
      date: "2024-03-25",
    },
    {
      id: 2,
      title: "바이브 코딩이란?",
      description: "AI와 함께 호흡하며 코드를 작성하는 새로운 방식에 대해 알아봅니다.",
      date: "2024-03-24",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">이정하의 블로그</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">한신대학교 공공인재 전공 | 취미: 바이브 코딩, 독서</p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl p-6">
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <time className="text-sm font-medium text-zinc-400">{post.date}</time>
              <h2 className="mt-2 text-xl font-bold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="mt-4">
                <span className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
                  더 읽어보기 &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="mt-12 border-t p-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        &copy; 2024 이정하. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

