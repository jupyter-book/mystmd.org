import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import { getMetaTagsForArticle, KatexCSS, ArticlePage } from '@myst-theme/site';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { getPage } from '~/utils/loaders.server';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { ArticleAndNavigation, HeaderSection, NavigationAndFooter } from '../components/Page';
import { Error404 } from '../components/Error404';
import { ProjectProvider } from '@myst-theme/providers';

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
  return getPage({ name: 'overview' });
};

export default function LandingPage() {
  const article = useLoaderData<PageLoader>() as PageLoader;
  (article.frontmatter as any).options = { hide_title_block: true, hide_footer_links: true };
  return (
    <ArticleAndNavigation header={<HeaderSection />} hide_toc>
      <ProjectProvider>
        <ComputeOptionsProvider
          features={{ notebookCompute: true, figureCompute: true, launchBinder: false }}
        >
          <ThebeLoaderAndServer baseurl={'/'}>
            <main className="article content article-grid grid-gap">
              <ArticlePage article={article} />
            </main>
          </ThebeLoaderAndServer>
        </ComputeOptionsProvider>
      </ProjectProvider>
    </ArticleAndNavigation>
  );
}

export function CatchBoundary() {
  return (
    <NavigationAndFooter hide_toc>
      <Error404 />
    </NavigationAndFooter>
  );
}
