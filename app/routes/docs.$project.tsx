import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { SiteLoader } from '@myst-theme/site';
import { KatexCSS, responseNoSite } from '@myst-theme/site';
import { Outlet, useLoaderData } from '@remix-run/react';
import { ArticlePageCatchBoundary } from '@myst-theme/site';
import { NavigationAndFooter } from '../components/Page';
import { getArticleConfig } from '../utils/loaders.server';
import { BaseUrlProvider, SiteProvider, useSiteManifest } from '@myst-theme/providers';

type ArticleConfig = Omit<SiteLoader, 'theme'>;

export const loader: LoaderFunction = async ({ params, request }): Promise<ArticleConfig> => {
  const { project } = params;
  if (!project) throw responseNoSite();
  const [config] = await Promise.all([getArticleConfig(project).catch(() => null)]);
  if (!config) throw responseNoSite();
  const data = { config };
  return data;
};

export const links: LinksFunction = () => [KatexCSS];

export default function LandingPage() {
  const siteConfig = useSiteManifest();
  const { config } = useLoaderData<ArticleConfig>();
  return (
    <BaseUrlProvider baseurl="/docs">
      <SiteProvider config={config}>
        <NavigationAndFooter
          projectSlug={config?.projects?.[0].slug}
          siteConfig={siteConfig as any}
        >
          <Outlet />
        </NavigationAndFooter>
      </SiteProvider>
    </BaseUrlProvider>
  );
}

export function CatchBoundary() {
  return (
    <NavigationAndFooter>
      <main className="article-content">
        <ArticlePageCatchBoundary />
      </main>
    </NavigationAndFooter>
  );
}
