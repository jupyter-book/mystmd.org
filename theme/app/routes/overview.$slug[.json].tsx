import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getPage } from '~/utils/loaders.server';

function api404(message = 'No API route found at this URL') {
  return json(
    {
      status: 404,
      message,
    },
    { status: 404 },
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const data = await getPage({ name: 'overview', slug }).catch(() => null);
  if (!data) return api404('No page found at this URL.');
  return json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
