import { ArticleProvider, useProjectManifest } from '@myst-theme/providers';
import {
  Bibliography,
  FooterLinksBlock,
  FrontmatterParts,
  BackmatterParts,
  Footnotes,
  extractKnownParts,
} from '@myst-theme/site';
import type { PageLoader } from '@myst-theme/common';
import { copyNode } from 'myst-common';
import { MyST } from 'myst-to-react';
import { SourceFileKind } from 'myst-spec-ext';
import {
  ExecuteScopeProvider,
  BusyScopeProvider,
  NotebookToolbar,
  ConnectionStatusTray,
  ErrorTray,
  useComputeOptions,
} from '@myst-theme/jupyter';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import type { SiteAction } from 'myst-config';

/**
 * Combines the project downloads and the export options
 */
function combineDownloads(
  siteDownloads: SiteAction[] | undefined,
  pageFrontmatter: PageLoader['frontmatter'],
) {
  if (pageFrontmatter.downloads) {
    return pageFrontmatter.downloads;
  }
  // No downloads on the page, combine the exports if they exist
  if (siteDownloads) {
    return [...(pageFrontmatter.exports ?? []), ...siteDownloads];
  }
  return pageFrontmatter.exports;
}

export function ArticlePage({
  article,
  hide_all_footer_links,
  hideKeywords,
}: {
  article: PageLoader;
  hide_all_footer_links?: boolean;
  hideKeywords?: boolean;
}) {
  const manifest = useProjectManifest();
  const compute = useComputeOptions();

  const { hide_title_block, hide_footer_links } = (article.frontmatter as any)?.options ?? {};
  const downloads = combineDownloads(manifest?.downloads, article.frontmatter);
  const tree = copyNode(article.mdast);
  const keywords = article.frontmatter?.keywords ?? [];
  const parts = extractKnownParts(tree);

  return (
    <ArticleProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
      kind={article.kind}
    >
      <BusyScopeProvider>
        <ExecuteScopeProvider enable={compute?.enabled ?? false} contents={article}>
          {!hide_title_block && (
            <FrontmatterBlock
              kind={article.kind}
              frontmatter={{ ...article.frontmatter, downloads }}
              className="pt-5 mb-8"
            />
          )}
          {compute?.enabled &&
            compute.features.notebookCompute &&
            article.kind === SourceFileKind.Notebook && <NotebookToolbar showLaunch />}
          {compute?.enabled && article.kind === SourceFileKind.Article && (
            <ErrorTray pageSlug={article.slug} />
          )}
          <div id="skip-to-article" />
          <FrontmatterParts parts={parts} keywords={keywords} hideKeywords={hideKeywords} />
          <MyST ast={tree} />
          <BackmatterParts parts={parts} />
          <Footnotes />
          <Bibliography />
          <ConnectionStatusTray />
          {!hide_footer_links && !hide_all_footer_links && (
            <FooterLinksBlock links={article.footer} />
          )}
        </ExecuteScopeProvider>
      </BusyScopeProvider>
    </ArticleProvider>
  );
}
