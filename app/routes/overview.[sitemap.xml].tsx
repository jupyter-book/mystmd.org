import { createSitemapResponse, getSiteSlugs } from '@myst-theme/site';
import { getDomainFromRequest } from '@myst-theme/site';
import type { LoaderFunction } from '@remix-run/node';
import { getConfig } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ params, request }): Promise<Response> => {
  const project = 'overview';
  if (!project) return new Response('Project not found', { status: 404 });
  const config = await getConfig(project).catch(() => null);
  if (!config) return new Response('Project not found', { status: 404 });
  return createSitemapResponse(getDomainFromRequest(request), [
    '/sandbox',
    ...getSiteSlugs(config, undefined, { excludeIndex: true }).map((url) => `/${project}${url}`),
  ]);
};
