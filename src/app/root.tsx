import type { LinksFunction, MetaFunction, LoaderFunction } from '@remix-run/node';
import tailwind from '~/styles/app.css';
import { getConfig } from '~/utils/loaders.server';
import type { SiteLoader } from '@curvenote/site';
import {
  App,
  responseNoSite,
  getMetaTagsForSite,
  getThemeSession,
  KatexCSS,
} from '@curvenote/site';
export {
  AppCatchBoundary as CatchBoundary,
  AppDebugErrorBoundary as ErrorBoundary,
} from '@curvenote/site';

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: 'utf-8',
    ...getMetaTagsForSite({
      title: data?.config?.title,
      twitter: data?.config?.twitter,
    }),
    viewport: 'width=device-width,initial-scale=1',
  };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwind }, KatexCSS];
};

export const loader: LoaderFunction = async ({ request }): Promise<SiteLoader> => {
  const [config, themeSession] = await Promise.all([
    getConfig().catch(() => null),
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

export default App;
