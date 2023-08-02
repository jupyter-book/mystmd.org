import type { LoaderFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import { ArticlePage } from '@myst-theme/site';
import { getPage } from '../utils/loaders.server';
import { NavLink, useLoaderData } from '@remix-run/react';
import { ArticleAndNavigation, NavigationAndFooter } from '../components/Page';
import { BaseUrlProvider, useSiteManifest } from '@myst-theme/providers';
import classNames from 'classnames';
import { Error404 } from '../components/Error404';

const baseurl = 'overview';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = params;
  const page = await getPage({ name: 'overview', slug });
  return page;
};

export default function ContentPage() {
  const site = useSiteManifest();
  const article = useLoaderData<PageLoader>() as PageLoader;
  (article as any).frontmatter.design = { hide_title_block: true, hide_footer_links: true };
  return (
    <ArticleAndNavigation hide_toc>
      <BaseUrlProvider baseurl={`/${baseurl}`}>
        <main className="article article-grid article-grid-gap py-[100px]">
          <h1 className="text-center">{article.frontmatter.title}</h1>
          <div className="col-body-outset">
            <div className="border-y border-gray-200 py-3 my-[100px] flex flex-row justify-around">
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
      </BaseUrlProvider>
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
