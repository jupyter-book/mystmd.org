import { type LoaderFunction } from '@remix-run/node';
import { type ThemeCssOptions, themeCSS, cssResponse, responseNoSite } from '@myst-theme/site';
import { getConfig, getCustomStyleSheet } from '~/utils/loaders.server';

export const loader: LoaderFunction = async ({ params }): Promise<Response> => {
  const { project } = params;
  if (!project) throw responseNoSite();
  const site = await getConfig(project);
  const css = await getCustomStyleSheet(project);
  return cssResponse(themeCSS(site?.options as ThemeCssOptions, css));
};
