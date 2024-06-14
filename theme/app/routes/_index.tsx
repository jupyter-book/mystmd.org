import type { LinksFunction, LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import { getMetaTagsForArticle, KatexCSS } from '@myst-theme/site';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { getPage } from '~/utils/loaders.server';
import { useLoaderData } from '@remix-run/react';
import { ArticleAndNavigation, HeaderSection, NavigationAndFooter } from '../components/Page';
import { Error404 } from '../components/Error404';
import { ProjectProvider } from '@myst-theme/providers';
import { ArticlePage } from '~/components/ArticlePage';

export const meta: V2_MetaFunction = ({ data, location }) => {
  if (!data) return [];
  const siteTitle = 'MyST Markdown';
  const page = data.frontmatter;
  return getMetaTagsForArticle({
    origin: '',
    url: location.pathname,
    title: page?.title ? `${page.title}${siteTitle ? ` - ${siteTitle}` : ''}` : siteTitle,
    description: page?.description ?? undefined,
    image: page?.thumbnailOptimized || page?.thumbnail,
    twitter: 'mystmarkdown',
    keywords: page?.keywords ?? [],
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
          <ThebeLoaderAndServer baseurl={''}>
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
