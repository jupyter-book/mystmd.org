import { DEFAULT_NAV_HEIGHT, Navigation, useNavigationHeight } from '@myst-theme/site';
import { TabStateProvider, UiStateProvider } from '@myst-theme/providers';
import LogoWhite from './logo-icon-white.svg';
import { Footer } from './Footer';
import { TopNav } from './TopNav';

export function HeaderSection() {
  return (
    <div className="bg-[#2B2A2D] min-h-[250px] hidden md:block">
      <div className="column-body-outset flex flex-row items-center leading-tight pt-12">
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
}: {
  top?: number;
  children: React.ReactNode;
  tightFooter?: boolean;
}) {
  const { ref, height } = useNavigationHeight<HTMLDivElement>();
  return (
    <>
      <Navigation top={top} height={height} hide_toc={true}>
        <TopNav />
      </Navigation>
      <div
        ref={ref}
        style={{ minHeight: `calc(100vh - ${top + 200}px)`, marginTop: DEFAULT_NAV_HEIGHT }}
      >
        {children}
      </div>
      <Footer tight={tightFooter} />
    </>
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
      <UiStateProvider>
        <article>{children}</article>
      </UiStateProvider>
    </TabStateProvider>
  );
}

export function ArticleAndNavigation({
  children,
  header,
  top = header ? 500 : DEFAULT_NAV_HEIGHT,
}: {
  top?: number;
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavigationAndFooter top={top}>
      {header}
      <TabStateProvider>
        <UiStateProvider>
          <article style={{ minHeight: `calc(100vh - ${top}px)` }}>{children}</article>
        </UiStateProvider>
      </TabStateProvider>
    </NavigationAndFooter>
  );
}
