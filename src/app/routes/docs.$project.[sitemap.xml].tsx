import { createSitemapResponse, getSiteSlugs } from '@curvenote/site';
import { getDomainFromRequest } from '@curvenote/site';
import type { LoaderFunction } from '@remix-run/node';
import { getArticleConfig } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ params, request }): Promise<Response> => {
  const { project } = params;
  if (!project) return new Response('Project not found', { status: 404 });
  const config = await getArticleConfig(project).catch(() => null);
  if (!config) return new Response('Project not found', { status: 404 });
  return createSitemapResponse(
    getDomainFromRequest(request),
    getSiteSlugs(config).map((s) => `/docs${s}`)
  );
};
