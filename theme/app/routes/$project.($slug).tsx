import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import {
  useOutlineHeight,
  FooterLinksBlock,
  getMetaTagsForArticle,
  DocumentOutline,
  Bibliography,
  Footnotes,
} from '@myst-theme/site';
import { MyST } from 'myst-to-react';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { useLoaderData } from '@remix-run/react';
import {
  ProjectProvider,
  ArticleProvider,
  useThemeTop,
  useSiteManifest,
} from '@myst-theme/providers';
import { getPage } from '~/utils/loaders.server';
import { ArticleWithProviders } from '../components/Page';
import type { TemplateOptions } from '../types';
import type { SiteManifest } from 'myst-config';

export const meta: V2_MetaFunction = ({ data, location }) => {
  if (!data) return [];
  const siteTitle = 'MyST Markdown';
  const page = data.frontmatter;
  return getMetaTagsForArticle({
    origin: '',
    url: location.pathname,
    title: page?.title ? `${page.title}${siteTitle ? ` - ${siteTitle}` : ''}` : siteTitle,
    description: page?.description ?? undefined,
    image: page?.thumbnailOptimized || page?.thumbnail,
    twitter: 'mystmarkdown',
    keywords: page?.keywords ?? [],
  });
};

export const loader: LoaderFunction = async ({ params }) => {
  const { project, slug } = params;
  const page = await getPage({ name: project as string, slug });
  return page;
};

export default function Page() {
  const { container, outline } = useOutlineHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  const top = useThemeTop();

  const pageDesign: TemplateOptions = (article.frontmatter as any)?.site ?? {};
  const siteDesign: TemplateOptions =
    (useSiteManifest() as SiteManifest & TemplateOptions)?.options ?? {};
  const { hide_title_block, hide_footer_links, hide_outline, outline_maxdepth } = {
    ...siteDesign,
    ...pageDesign,
  };

  return (
    <ArticleProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
      kind={article.kind}
    >
      <ProjectProvider>
        <ComputeOptionsProvider
          features={{ notebookCompute: true, figureCompute: true, launchBinder: false }}
        >
          <ThebeLoaderAndServer baseurl={''}>
            <main ref={container}>
              <ArticleWithProviders article={article}>
                {!hide_title_block && (
                  <FrontmatterBlock
                    kind={article.kind}
                    frontmatter={article.frontmatter}
                    className="pt-9"
                  />
                )}
                {!hide_outline && (
                  <div
                    className="sticky z-10 hidden h-0 pt-5 ml-10 col-margin-right lg:block"
                    style={{ top }}
                  >
                    <DocumentOutline
                      top={16}
                      className="relative lg:block"
                      outlineRef={outline}
                      maxdepth={outline_maxdepth}
                      isMargin={false}
                    />
                  </div>
                )}
                <div id="skip-to-article" />
                <MyST ast={article.mdast.children} />
                <Footnotes />
                <Bibliography />
                {!hide_footer_links && <FooterLinksBlock links={article.footer} />}
              </ArticleWithProviders>
            </main>
          </ThebeLoaderAndServer>
        </ComputeOptionsProvider>
      </ProjectProvider>
    </ArticleProvider>
  );
}
