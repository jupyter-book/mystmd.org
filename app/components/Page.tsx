import { DEFAULT_NAV_HEIGHT, Navigation, useNavigationHeight } from '@myst-theme/site';
import { TabStateProvider, UiStateProvider } from '@myst-theme/providers';
import LogoWhite from './logo-icon-white.svg';
import { Footer } from './Footer';
import { TopNav } from './TopNav';

export function HeaderSection() {
  return (
    <div className="bg-[#2B2A2D] min-h-[250px] article-grid article-grid-gap">
      <div className="col-body-outset flex flex-row items-center leading-tight">
        <img src={LogoWhite} style={{ height: 150 }} alt="MyST Markdown Logo" className="mr-6" />
        <h1 className="text-white text-[2.754rem]">
          MyST Markdown
          <br />
          <strong>Tools</strong>
        </h1>
      </div>
    </div>
  );
}

export function NavigationAndFooter({
  children,
  top = DEFAULT_NAV_HEIGHT,
  tightFooter,
  hide_toc,
}: {
  top?: number;
  children: React.ReactNode;
  tightFooter?: boolean;
  hide_toc?: boolean;
}) {
  const { ref, height } = useNavigationHeight<HTMLDivElement>();
  return (
    <UiStateProvider>
      <Navigation top={top} height={height} hide_toc={hide_toc}>
        <TopNav hide_toc={hide_toc} />
      </Navigation>
      <div
        ref={ref}
        style={{ minHeight: `calc(100vh - ${top + 200}px)`, marginTop: DEFAULT_NAV_HEIGHT }}
      >
        {children}
      </div>
      <Footer tight={tightFooter} />
    </UiStateProvider>
  );
}

export function ArticleWithProviders({
  children,
  top = DEFAULT_NAV_HEIGHT,
}: {
  top?: number;
  children: React.ReactNode;
}) {
  return (
    <TabStateProvider>
      <article className="article content article-grid article-grid-gap min-h-screen">
        {children}
      </article>
    </TabStateProvider>
  );
}

export function ArticleAndNavigation({
  children,
  header,
  top = header ? 500 : DEFAULT_NAV_HEIGHT,
  hide_toc,
}: {
  top?: number;
  header?: React.ReactNode;
  children: React.ReactNode;
  hide_toc?: boolean;
}) {
  return (
    <NavigationAndFooter top={top} hide_toc={hide_toc}>
      {header}
      <TabStateProvider>
        <article style={{ minHeight: `calc(100vh - ${top}px)` }}>{children}</article>
      </TabStateProvider>
    </NavigationAndFooter>
  );
}
