import type { LoaderFunction } from '@remix-run/node';
import { getObjectsInv } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ params }): Promise<Response> => {
  const { project } = params;
  if (!project) return new Response('Inventory not found', { status: 404 });
  const inv = await getObjectsInv(project);
  if (!inv) return new Response('Inventory not found', { status: 404 });
  return new Response(inv);
};
