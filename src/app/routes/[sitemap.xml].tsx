import { createSitemapIndexResponse } from '@curvenote/site';
import { getDomainFromRequest } from '@curvenote/site';
import type { LoaderFunction } from '@remix-run/node';

// TODO: get these from the config!
const projects = ['mystjs', 'jtex', 'spec', 'myst-cli', 'myst-to-tex', 'myst-transforms'];

export const loader: LoaderFunction = async ({ request }): Promise<Response> => {
  return createSitemapIndexResponse(getDomainFromRequest(request), [
    '/sitemap_index.xml',
    ...projects.map((p) => `/docs/${p}/sitemap.xml`),
  ]);
};
