export function Error404() {
  return (
    <main className="article">
      <section className="flex flex-col md:flex-row md:my-[20vh] max-w-fit mx-auto">
        <div className="self-center">
          <h3>404. We could not find that article.</h3>
          <p>The requested URL was not found on this server.</p>
          <p>
            <a href="/">Take me home!</a>
          </p>
        </div>
        <img
          src="/404.webp"
          alt="Page not Found"
          className="w-[300px] max-w-full self-center dark:brightness-125 md:ml-10"
        />
      </section>
    </main>
  );
}
