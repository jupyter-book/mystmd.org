import type { LoaderFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/site';
import { ArticlePage, ProjectPageCatchBoundary, useNavigationHeight } from '@myst-theme/site';
import { getPage } from '../utils/loaders.server';
import { NavLink, useLoaderData } from '@remix-run/react';
import { ArticleAndNavigation } from '../components/Page';
import { useSiteManifest } from '@myst-theme/providers';
import classNames from 'classnames';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { info } = params;
  const page = await getPage(request, { project: 'overview', slug: info });
  return page;
};

export default function ContentPage() {
  const { ref, height } = useNavigationHeight();
  const site = useSiteManifest();
  const article = useLoaderData<PageLoader>() as PageLoader;
  return (
    <ArticleAndNavigation>
      <main ref={ref} className="article py-[100px]">
        <h1 className="text-center">{article.frontmatter.title}</h1>
        <div className="column-page xl:px-[150px]">
          <div className="border-y border-gray-200 py-3 my-[100px] flex flex-row justify-around">
            {site?.projects?.[0].pages
              .filter((p) => 'slug' in p)
              .map((p) => {
                if (p.level === 1)
                  return (
                    <NavLink
                      key={p.slug}
                      to={'/' + p.slug}
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
        <div className=" column-body">
          <ArticlePage article={article} />
        </div>
      </main>
    </ArticleAndNavigation>
  );
}

export function CatchBoundary() {
  return (
    <ArticleAndNavigation>
      <main className="article-content">
        <ProjectPageCatchBoundary />
      </main>
    </ArticleAndNavigation>
  );
}
