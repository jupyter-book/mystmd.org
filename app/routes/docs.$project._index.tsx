import { ProjectPageCatchBoundary } from '@myst-theme/site';
import Page from './docs.$project.$slug';
export { loader, meta } from './docs.$project.$slug';
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
