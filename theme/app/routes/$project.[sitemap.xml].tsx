import { createSitemapResponse, getSiteSlugs, getDomainFromRequest } from '@myst-theme/site';
import type { LoaderFunction } from '@remix-run/node';
import { getConfig } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ params, request }): Promise<Response> => {
  const { project } = params;
  if (!project) return new Response('Project not found', { status: 404 });
  const config = await getConfig(project).catch(() => null);
  if (!config) return new Response('Project not found', { status: 404 });
  return createSitemapResponse(
    getDomainFromRequest(request),
    getSiteSlugs(config).map((s) => `/${project}${s}`)
  );
};
