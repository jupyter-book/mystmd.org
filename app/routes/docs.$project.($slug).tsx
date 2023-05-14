import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/site';
import { useOutlineHeight, useTocHeight } from '@myst-theme/site';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import {
  FooterLinksBlock,
  DEFAULT_NAV_HEIGHT,
  TableOfContents,
  getMetaTagsForArticle,
  DocumentOutline,
  ContentBlocks,
  Bibliography,
  ArticlePageCatchBoundary,
} from '@myst-theme/site';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { BaseUrlProvider, ReferencesProvider } from '@myst-theme/providers';
import { getArticlePage } from '~/utils/loaders.server';
import { ArticleWithProviders } from '../components/Page';
import { useEffect } from 'react';
import type { GenericParent } from 'myst-common';

export const meta: MetaFunction = (args) => {
  const config = (args.parentsData?.['routes/docs.$project']?.config ??
    args.parentsData?.root?.config) as SiteManifest | undefined;
  const data = args.data as PageLoader | undefined;
  if (!config || !data || !data.frontmatter) return {};
  return getMetaTagsForArticle({
    origin: '',
    url: args.location.pathname,
    title: `${data.frontmatter.title} - ${config?.title}`,
    description: data.frontmatter.description,
    image: (data.frontmatter.thumbnailOptimized || data.frontmatter.thumbnail) ?? undefined,
  });
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const { project, slug } = params;
  const page = await getArticlePage(project as string, { project: project as string, slug });
  return page;
};

function ArticlePage({ article }: { article: PageLoader }) {
  return (
    <>
      <ContentBlocks mdast={article.mdast as GenericParent} />
      <Bibliography />
      <FooterLinksBlock links={article.footer} />
    </>
  );
}

export default function Page() {
  const { container, outline } = useOutlineHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
    >
      <main ref={container}>
        <ArticleWithProviders>
          <FrontmatterBlock kind={article.kind} frontmatter={article.frontmatter} />
          {/* <FloatingOutline height={height} /> */}
          <ArticlePage article={article} />
        </ArticleWithProviders>
        <DocumentOutline top={DEFAULT_NAV_HEIGHT + 50} outlineRef={outline} />
      </main>
    </ReferencesProvider>
  );
}

export function CatchBoundary() {
  return (
    <ArticleWithProviders>
      <main className="article-content">
        <ArticlePageCatchBoundary />
      </main>
    </ArticleWithProviders>
  );
}
