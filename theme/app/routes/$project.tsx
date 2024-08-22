import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import type { SiteLoader } from '@myst-theme/common';
import { KatexCSS, responseNoSite } from '@myst-theme/site';
import { Outlet, useLoaderData, useParams } from '@remix-run/react';
import { NavigationAndFooter } from '../components/Page';
import { getConfig } from '../utils/loaders.server';
import { BaseUrlProvider, SiteProvider, useSiteManifest } from '@myst-theme/providers';
import { Error404 } from '../components/Error404';

type ArticleConfig = Omit<SiteLoader, 'theme'>;

export const loader: LoaderFunction = async ({ params, request }): Promise<ArticleConfig> => {
  const { project } = params;
  if (!project) throw responseNoSite();
  const [config] = await Promise.all([getConfig(project).catch(() => null)]);
  if (!config) throw responseNoSite();
  const data = { config };
  return data;
};

export const links: LinksFunction = () => [KatexCSS];

export default function LandingPage() {
  const siteConfig = useSiteManifest();
  const { project } = useParams();
  const { config } = useLoaderData<ArticleConfig>();
  return (
    <BaseUrlProvider baseurl={`/${project}`}>
      <SiteProvider config={config}>
        <NavigationAndFooter projectSlug={project} mainSiteConfig={siteConfig as any}>
          <Outlet />
        </NavigationAndFooter>
      </SiteProvider>
    </BaseUrlProvider>
  );
}

export function CatchBoundary() {
  return (
    <NavigationAndFooter mobileOnly>
      <Error404 />
    </NavigationAndFooter>
  );
}
