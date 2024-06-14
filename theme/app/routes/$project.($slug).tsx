import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import {
  useOutlineHeight,
  FooterLinksBlock,
  getMetaTagsForArticle,
  DocumentOutline,
  ContentBlocks,
  Bibliography,
  Footnotes,
} from '@myst-theme/site';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { useLoaderData } from '@remix-run/react';
import { ProjectProvider, ReferencesProvider, useThemeTop } from '@myst-theme/providers';
import { getPage } from '~/utils/loaders.server';
import { ArticleWithProviders } from '../components/Page';
import type { GenericParent } from 'myst-common';

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

export const loader: LoaderFunction = async ({ params, request }) => {
  const { project, slug } = params;
  const page = await getPage({ name: project as string, slug });
  return page;
};

function ArticlePage({ article }: { article: PageLoader }) {
  return (
    <>
      <div id="skip-to-article" />
      <ContentBlocks mdast={article.mdast as GenericParent} />
      <Footnotes />
      <Bibliography />
      <FooterLinksBlock links={article.footer} />
    </>
  );
}

export default function Page() {
  const { container, outline } = useOutlineHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  const top = useThemeTop();

  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
    >
      <ProjectProvider>
        <ComputeOptionsProvider
          features={{ notebookCompute: true, figureCompute: true, launchBinder: false }}
        >
          <ThebeLoaderAndServer baseurl={''}>
            <main ref={container}>
              <ArticleWithProviders article={article}>
                <FrontmatterBlock
                  kind={article.kind}
                  frontmatter={article.frontmatter}
                  className="pt-5"
                />
                <div
                  className="sticky z-10 hidden h-0 pt-2 ml-10 col-margin-right lg:block"
                  style={{ top }}
                >
                  <DocumentOutline top={16} className="relative lg:block" outlineRef={outline} />
                </div>
                <ArticlePage article={article} />
              </ArticleWithProviders>
            </main>
          </ThebeLoaderAndServer>
        </ComputeOptionsProvider>
      </ProjectProvider>
    </ReferencesProvider>
  );
}
