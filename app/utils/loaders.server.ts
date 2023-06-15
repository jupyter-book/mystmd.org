import type { PageLoader } from '@myst-theme/site';
import { cdn } from '@myst-theme/site';
import type { SiteManifest } from 'myst-config';

// const getDocsSites = (name: string) => `mystmdstaging-${name.replace(/-/g, '_')}.curve.space`;
const getDocsSites = (name: string) => `mystmd-${name.replace(/-/g, '_')}.curve.space`;

export async function getConfig(name: string): Promise<SiteManifest> {
  const config = await cdn.getConfig(getDocsSites(name));
  return config;
}

export async function getPage(opts: {
  name: string;
  slug?: string;
}): Promise<PageLoader | Response | null> {
  const host = getDocsSites(opts.name);
  const data = await cdn.getPage(host, { slug: opts.slug });
  return data;
}

export async function getObjectsInv(project: string): Promise<Buffer | undefined> {
  return cdn.getObjectsInv(getDocsSites(project));
}
