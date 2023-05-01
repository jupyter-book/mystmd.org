import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/site';
import { getMetaTagsForArticle, KatexCSS, ArticlePage } from '@myst-theme/site';
import { getPage } from '~/utils/loaders.server';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { ArticlePageCatchBoundary } from '@myst-theme/site';
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
  const article = useLoaderData<PageLoader>() as PageLoader;
  // Big of a hack...
  const design = { hide_title_block: true, hide_footer_links: true };
  (article.frontmatter as any).design = design;
  return (
    <ArticleAndNavigation header={<HeaderSection />} hide_toc>
      <main className="article content article-grid article-grid-gap">
        <ArticlePage article={article} />
      </main>
    </ArticleAndNavigation>
  );
}

export function CatchBoundary() {
  return (
    <ArticleAndNavigation>
      <main className="article content article-grid article-grid-gap">
        <ArticlePageCatchBoundary />
      </main>
    </ArticleAndNavigation>
  );
}
