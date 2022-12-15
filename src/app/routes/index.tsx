import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@curvenote/site';
import { getMetaTagsForArticle, KatexCSS, ArticlePage, useNavigationHeight } from '@curvenote/site';
import { getPage } from '~/utils/loaders.server';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { ArticlePageCatchBoundary } from '@curvenote/site';
import { ArticleAndNavigation, HeaderSection } from '../components/Page';

export const meta: MetaFunction = (args) => {
  const config = args.parentsData?.root?.config as SiteManifest | undefined;
  const data = args.data as PageLoader | undefined;
  if (!config || !data || !data.frontmatter) return {};
  return getMetaTagsForArticle({
    origin: '',
    url: args.location.pathname,
    title: `${data.frontmatter.title} - ${config?.title}`,
    description: data.frontmatter.description,
    image: (data.frontmatter.thumbnailOptimized || data.frontmatter.thumbnail) ?? undefined,
  });
};

export const links: LinksFunction = () => [KatexCSS];

export const loader: LoaderFunction = async ({ request }) => {
  return getPage(request, { project: 'overview' });
};

export default function LandingPage() {
  const { ref, height } = useNavigationHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  return (
    <ArticleAndNavigation header={<HeaderSection />}>
      <main ref={ref} className="article column-body-outset mt-[60px]">
        <ArticlePage article={article} />
      </main>
    </ArticleAndNavigation>
  );
}

export function CatchBoundary() {
  return (
    <ArticleAndNavigation>
      <main className="article column-body">
        <ArticlePageCatchBoundary />
      </main>
    </ArticleAndNavigation>
  );
}
