import type { PageLoader } from '@curvenote/site';
import { cdn } from '@curvenote/site';
import type { SiteManifest } from '@curvenote/site-common';

// const CONTENT_CDN_PORT = process.env.CONTENT_CDN_PORT ?? '3100';
// const CONTENT_CDN = `http://localhost:${CONTENT_CDN_PORT}`;

// const INDEX_SITE = 'www.myst.tools';
const INDEX_SITE = 'rowanc1-myst_tools.curve.space';

export async function getConfig(): Promise<SiteManifest> {
  return cdn.getConfig(INDEX_SITE);
  // const url = `${CONTENT_CDN}/config.json`;
  // const response = await fetch(url).catch(() => null);
  // if (!response || response.status === 404) {
  //   throw new Error(`No site configuration found at ${url}`);
  // }
  // const data = (await response.json()) as SiteManifest;
  // return updateSiteManifestStaticLinksInplace(data, updateLink);
}

export async function getArticleConfig(name: string): Promise<SiteManifest> {
  const config = await cdn.getConfig(`${name}.myst.tools`);
  return config;
}

// function updateLink(url: string) {
//   if (!url) return url;
//   return `${CONTENT_CDN}${url}`;
// }

// async function getStaticContent(project?: string, slug?: string): Promise<PageLoader | null> {
//   if (!project || !slug) return null;
//   const url = `${CONTENT_CDN}/content/${project}/${slug}.json`;
//   const response = await fetch(url).catch(() => null);
//   if (!response || response.status === 404) return null;
//   const data = (await response.json()) as PageLoader;
//   return updatePageStaticLinksInplace(data, updateLink);
// }

export async function getArticlePage(
  name: string,
  opts: { project: string; slug?: string }
): Promise<PageLoader | Response | null> {
  const data = await cdn.getPage(`${name}.myst.tools`, opts);
  return data;
}

export async function getPage(
  request: Request,
  opts: { project?: string; loadIndexPage?: boolean; slug?: string; redirect?: boolean | string }
) {
  return cdn.getPage(INDEX_SITE, opts);
  // const projectName = opts.project;
  // const config = await getConfig();
  // if (!config) throw responseNoSite();
  // const project = getProject(config, projectName);
  // if (!project) throw responseNoArticle();
  // if (opts.slug === project.index && opts.redirect) {
  //   return redirect(`${typeof opts.redirect === 'string' ? opts.redirect : '/'}${projectName}`);
  // }
  // const slug = opts.loadIndexPage || opts.slug == null ? project.index : opts.slug;
  // const loader = await getStaticContent(projectName, slug).catch(() => null);
  // if (!loader) throw responseNoArticle();
  // const footer = getFooterLinks(config, projectName, slug);
  // return { ...loader, footer, domain: getDomainFromRequest(request) };
}

export async function getObjectsInv(): Promise<Buffer | undefined> {
  return cdn.getObjectsInv('myst.tools');
}
