import { createSitemapResponse, getSiteSlugs } from '@curvenote/site';
import { getDomainFromRequest } from '@curvenote/site';
import type { LoaderFunction } from '@remix-run/node';
import { getConfig } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ request }): Promise<Response> => {
  const config = await getConfig();
  return createSitemapResponse(
    getDomainFromRequest(request),
    getSiteSlugs(config).map((s) => s.replace(/^\/overview/, ''))
  );
};
