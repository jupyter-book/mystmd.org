import { ProjectPageCatchBoundary } from '@myst-theme/site';
import Page from './$slug';
export { loader } from './$slug';
export default Page;

export function CatchBoundary() {
  return (
    <article>
      <main className="article-content">
        <ProjectPageCatchBoundary />
      </main>
    </article>
  );
}
