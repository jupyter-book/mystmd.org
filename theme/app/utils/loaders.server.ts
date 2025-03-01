import type { PageLoader } from '@myst-theme/common';
import * as cdn from '@curvenote/cdn';
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

export async function getObjectsInv(project: string): Promise<ArrayBuffer | undefined> {
  return cdn.getObjectsInv(getDocsSites(project));
}

export async function getMystXrefJson(project: string): Promise<Record<string, any> | null> {
  return cdn.getMystXrefJson(getDocsSites(project));
}

export async function getCustomStyleSheet(project: string): Promise<string | undefined> {
  // We are always fetching this at run time, so we don't want the rewritten links
  const config = await getConfig(project);
  const url = config.options?.style;
  if (!url) {
    return;
  }
  const response = await fetch(url).catch(() => null);
  if (!response || response.status === 404) return;
  const css = await response.text();
  return css;
}
