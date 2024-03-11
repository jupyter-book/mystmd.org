import type { LoaderFunction } from '@remix-run/node';
import { responseNoSite } from '@myst-theme/site';
import { NavigationAndFooter } from '../components/Page';
import { Error404 } from '../components/Error404';

export const loader: LoaderFunction = async () => {
  throw responseNoSite();
};

export default function Error() {
  return (
    <NavigationAndFooter hide_toc>
      <Error404 />
    </NavigationAndFooter>
  );
}

export function CatchBoundary() {
  return (
    <NavigationAndFooter hide_toc>
      <Error404 />
    </NavigationAndFooter>
  );
}
