import type { LinksFunction, V2_MetaFunction, LoaderFunction } from '@remix-run/node';
import tailwind from '~/styles/app.css';
import { getConfig } from '~/utils/loaders.server';
import {
  Document,
  responseNoSite,
  getMetaTagsForSite,
  getThemeSession,
  KatexCSS,
  renderers as defaultRenderers,
} from '@myst-theme/site';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { SiteLoader } from '@myst-theme/common';
import type { NodeRenderers } from '@myst-theme/providers';
import { mergeRenderers } from '@myst-theme/providers';
import { JUPYTER_RENDERERS } from '@myst-theme/jupyter';
import { LANDING_PAGE_RENDERERS } from '@myst-theme/landing-pages';

const RENDERERS: NodeRenderers = mergeRenderers([
  defaultRenderers,
  JUPYTER_RENDERERS,
  LANDING_PAGE_RENDERERS,
]);

export const meta: V2_MetaFunction = ({ data }) => {
  return getMetaTagsForSite({
    title: data?.config?.title,
    twitter: data?.config?.twitter,
  });
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    KatexCSS,
    { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3' },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const [config, themeSession] = await Promise.all([
    getConfig('overview').catch(() => null),
    getThemeSession(request),
  ]);
  if (!config) throw responseNoSite();
  const data = {
    theme: themeSession.getTheme(),
    config,
    CONTENT_CDN_PORT: process.env.CONTENT_CDN_PORT,
  };
  return data;
};

function App() {
  const { theme, config } = useLoaderData<SiteLoader>();
  return (
    <Document theme={theme} config={config} renderers={RENDERERS}>
      <Outlet />
    </Document>
  );
}

export default App;
