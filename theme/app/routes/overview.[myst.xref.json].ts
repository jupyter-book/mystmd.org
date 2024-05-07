import { json, type LoaderFunction } from '@remix-run/node';
import { getMystXrefJson } from '~/utils/loaders.server';

export const loader: LoaderFunction = async (): Promise<Response> => {
  const project = 'overview';
  const data = await getMystXrefJson(project);
  if (!data) return new Response('myst.xref.json not found', { status: 404 });
  return json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
