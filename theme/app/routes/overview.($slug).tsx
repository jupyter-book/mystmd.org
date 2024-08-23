import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import { getMetaTagsForArticle } from '@myst-theme/site';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { getPage } from '../utils/loaders.server';
import { NavLink, useLoaderData } from '@remix-run/react';
import { ArticleAndNavigation, NavigationAndFooter } from '../components/Page';
import { BaseUrlProvider, ProjectProvider, useSiteManifest } from '@myst-theme/providers';
import { Error404 } from '../components/Error404';
import { ArticlePage } from '~/components/ArticlePage';
import classNames from 'classnames';

const baseurl = 'overview';

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

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = params;
  const page = await getPage({ name: 'overview', slug });
  return page;
};

export default function ContentPage() {
  const site = useSiteManifest();
  const article = useLoaderData<PageLoader>() as PageLoader;
  (article as any).frontmatter.options = { hide_title_block: true, hide_footer_links: true };
  return (
    <BaseUrlProvider baseurl={`/${baseurl}`}>
      <ArticleAndNavigation mobileNavOnly>
        <ProjectProvider>
          <ComputeOptionsProvider
            features={{ notebookCompute: true, figureCompute: true, launchBinder: false }}
          >
            <ThebeLoaderAndServer baseurl={''}>
              <main className="article article-grid grid-gap py-[100px]">
                <h1 className="text-center">{article.frontmatter.title}</h1>
                <div className="col-body-outset">
                  <div className="flex flex-row justify-around py-3 mt-12 mb-20 border-gray-200 border-y">
                    {site?.projects?.[0].pages
                      .filter((p) => 'slug' in p)
                      .map((p) => {
                        if (p.level === 1)
                          return (
                            <NavLink
                              key={p.slug}
                              to={`/${baseurl}/${p.slug}`}
                              prefetch="intent"
                              className={({ isActive }) =>
                                classNames('no-underline', { 'text-blue-600': isActive })
                              }
                            >
                              {p.title}
                            </NavLink>
                          );
                        return null;
                      })}
                  </div>
                </div>
                <ArticlePage article={article} />
              </main>
            </ThebeLoaderAndServer>
          </ComputeOptionsProvider>
        </ProjectProvider>
      </ArticleAndNavigation>
    </BaseUrlProvider>
  );
}

export function CatchBoundary() {
  return (
    <NavigationAndFooter hide_toc>
      <Error404 />
    </NavigationAndFooter>
  );
}
