import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@curvenote/site';
import { FooterLinksBlock } from '@curvenote/site';
import { FrontmatterBlock } from '@curvenote/site';
import { DEFAULT_NAV_HEIGHT } from '@curvenote/site';
import { TableOfContents } from '@curvenote/site';
import {
  getMetaTagsForArticle,
  useNavigationHeight,
  DocumentOutline,
  ContentBlocks,
  Bibliography,
} from '@curvenote/site';
import { getArticlePage } from '~/utils/loaders.server';
import { useLoaderData, useTransition } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { ReferencesProvider } from '@curvenote/ui-providers';
import { ArticlePageCatchBoundary } from '@curvenote/site';
import { ArticleWithProviders } from '../../components/Page';
import { useEffect, useRef, useState } from 'react';

export const meta: MetaFunction = (args) => {
  const config = args.parentsData?.root?.config as SiteManifest | undefined;
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
  return getArticlePage(project as string, { project: project as string, slug });
};

export function useSticky<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [sticky, setStickyState] = useState(false);
  const transitionState = useTransition().state;
  const setSticky = () => {
    if (ref.current) {
      setStickyState(window.scrollY > ref.current.offsetTop);
    }
  };
  useEffect(() => {
    setSticky();
    setTimeout(setSticky, 100); // Some lag sometimes
    const handleScroll = () => setSticky();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, transitionState]);
  return { ref, sticky };
}

function ArticlePage({ article }: { article: PageLoader }) {
  return (
    <>
      <ContentBlocks mdast={article.mdast} />
      <Bibliography />
      <FooterLinksBlock links={article.footer} />
    </>
  );
}

export default function Page() {
  const { ref, height } = useNavigationHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
      urlbase="/docs"
    >
      <TableOfContents
        top={DEFAULT_NAV_HEIGHT}
        height={height + DEFAULT_NAV_HEIGHT - 12}
        showFooter={false}
      />
      <main ref={ref} className="article column-body min-h-screen">
        <ArticleWithProviders>
          <FrontmatterBlock kind={article.kind} frontmatter={article.frontmatter} />
          {/* <FloatingOutline height={height} /> */}
          <ArticlePage article={article} />
        </ArticleWithProviders>
        <DocumentOutline top={DEFAULT_NAV_HEIGHT + 50} height={height + DEFAULT_NAV_HEIGHT - 12} />
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
