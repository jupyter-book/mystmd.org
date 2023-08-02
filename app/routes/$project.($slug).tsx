import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import type { PageLoader } from '@myst-theme/common';
import { useOutlineHeight } from '@myst-theme/site';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import {
  FooterLinksBlock,
  DEFAULT_NAV_HEIGHT,
  getMetaTagsForArticle,
  DocumentOutline,
  ContentBlocks,
  Bibliography,
} from '@myst-theme/site';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { ReferencesProvider } from '@myst-theme/providers';
import { getPage } from '~/utils/loaders.server';
import { ArticleWithProviders } from '../components/Page';
import type { GenericParent } from 'myst-common';

export const meta: MetaFunction = (args) => {
  const config = (args.parentsData?.['routes/$project']?.config ??
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
  const page = await getPage({ name: project as string, slug });
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
  const { container } = useOutlineHeight();
  const article = useLoaderData<PageLoader>() as PageLoader;
  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
    >
      <main ref={container}>
        <ArticleWithProviders article={article}>
          <FrontmatterBlock kind={article.kind} frontmatter={article.frontmatter} />
          <div className="sticky top-0 z-10 hidden h-0 pt-2 ml-10 col-margin-right lg:block">
            <DocumentOutline top={DEFAULT_NAV_HEIGHT + 10} className="relative lg:block" />
          </div>
          <ArticlePage article={article} />
        </ArticleWithProviders>
      </main>
    </ReferencesProvider>
  );
}
