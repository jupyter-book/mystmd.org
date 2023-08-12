import type { PageLoader } from '@myst-theme/common';
import { DEFAULT_NAV_HEIGHT, Navigation, useTocHeight } from '@myst-theme/site';
import {
  SiteProvider,
  TabStateProvider,
  UiStateProvider,
  useSiteManifest,
  useThemeTop,
} from '@myst-theme/providers';
import { BusyScopeProvider, ExecuteScopeProvider } from '@myst-theme/jupyter';
import Logo from './logo-icon.svg';
import JupyterLogo from './jupyter.svg';
import VSCodeLogo from './vscode.svg';
import PythonLogo from './python.svg';
import JsLogo from './javascript.svg';
import SphinxLogo from './sphinx.webp';
import LatexLogo from './latex.svg';
import WordLogo from './word.svg';
import HeaderImage from './hero.svg';
import { Footer } from './Footer';
import { TopNav } from './TopNav';
import { MySTRenderer } from 'myst-demo';
import type { SiteManifest } from 'myst-config';

const value = `MyST makes Markdown more _extensible_ & **powerful** to support an ecosystem of tools for computational narratives, technical documentation, and open scientific communication.

:::{important} Our Values
We believe in a community-driven approach of open-source tools that are composable and extensible.
:::
`;

export function HeaderSection() {
  return (
    <>
      <div className="pt-6 article article-grid subgrid-gap bg-slate-100">
        <div className="text-center col-page-inset">
          <div className="inline-block px-2">
            <img src={Logo} width={50} alt="MyST Logo" className="mt-2 mb-0" />
          </div>
          <h1 className="text-[1.5rem] md:text-[2.5rem] font-semibold text-slate-900 lg:self-center mb-0 leading-relaxed">
            Community-driven tools for
            <br />
            technical communication
          </h1>
          <p className="text-slate-700">
            MyST extends Markdown for technical, scientific communication and publication
          </p>

          <a
            className="inline-block align-middle px-3 py-2 shadow text-white bg-blue-800 hover:bg-blue-900 mt-4 font-medium text-[12px] no-underline"
            href="/guide"
          >
            Get Started
          </a>
        </div>
      </div>
      <div
        className="col-screen h-[30vw] -mb-[27vw] w-full bg-no-repeat bg-contain bg-top pointer-events-none"
        style={{ backgroundImage: `url(${HeaderImage})` }}
      ></div>
      <div className="article article-grid grid-gap relative mb-[25px]">
        {/* This is desktop */}
        <MySTRenderer
          value={value}
          column
          fullscreen
          captureTab
          className="hidden md:grid md:h-[400px] xl:h-[375px] col-screen-inset lg:mx-10 bg-white/80 backdrop-blur shadow"
        />
        {/* This is mobile */}
        <MySTRenderer value={value} fullscreen captureTab className="block mt-5 shadow md:hidden" />
        <a
          className="hidden md:block col-screen-inset lg:mx-10 px-2 py-1 bg-blue-800 hover:bg-blue-900 text-white absolute top-[10px] left-2 border dark:border-slate-600 text-sm no-underline"
          // onClick={copy}
          href="/sandbox"
        >
          Open Sandbox
        </a>
        <div className="text-center col-page-inset">
          <div className="inline-block px-2 py-1 my-3 text-sm font-normal rounded-lg w-fit">
            MyST Ecosystem
          </div>
          <div className="flex flex-wrap gap-x-5 text-center lg:mx-[100px]">
            <img src={JupyterLogo} alt="Jupyter Project" className="h-[40px] mx-auto" />
            <img src={VSCodeLogo} alt="Visual Studio Code" className="h-[40px] mx-auto" />
            <img src={PythonLogo} alt="Python" className="h-[40px] mx-auto" />
            <img src={JsLogo} alt="Javascript" className="h-[40px] mx-auto hidden sm:block" />
            <img src={SphinxLogo} alt="Sphinx Documentation" className="h-[40px] mx-auto" />
            <img
              src={LatexLogo}
              alt="LaTeX"
              className="h-[40px] mx-auto hidden sm:block dark:invert"
            />
            <img src={WordLogo} alt="Microsoft Word" className="h-[40px] mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}

export function NavigationAndFooter({
  children,
  tightFooter,
  hide_toc,
  projectSlug,
  siteConfig,
}: {
  children: React.ReactNode;
  tightFooter?: boolean;
  hide_toc?: boolean;
  projectSlug?: string;
  siteConfig?: SiteManifest;
}) {
  const siteConfigDefault = useSiteManifest();
  const top = useThemeTop();
  const { container, toc } = useTocHeight<HTMLDivElement>(top);
  return (
    <UiStateProvider>
      <Navigation tocRef={toc} hide_toc={hide_toc} projectSlug={projectSlug}>
        <SiteProvider config={siteConfig ?? siteConfigDefault}>
          <TopNav hide_toc={hide_toc} />
        </SiteProvider>
        <div
          ref={container}
          style={{ minHeight: `calc(100vh - ${top + 200}px)`, marginTop: DEFAULT_NAV_HEIGHT }}
        >
          {children}
        </div>
      </Navigation>
      <Footer tight={tightFooter} />
    </UiStateProvider>
  );
}

export function ArticleWithProviders({
  children,
  article,
  top = DEFAULT_NAV_HEIGHT,
}: {
  top?: number;
  children: React.ReactNode;
  article: PageLoader;
}) {
  return (
    <BusyScopeProvider>
      <ExecuteScopeProvider contents={article}>
        <TabStateProvider>
          <article className="min-h-screen article content article-grid grid-gap">
            {children}
          </article>
        </TabStateProvider>
      </ExecuteScopeProvider>
    </BusyScopeProvider>
  );
}

export function ArticleAndNavigation({
  children,
  header,
  hide_toc,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
  hide_toc?: boolean;
}) {
  const top = useThemeTop();
  return (
    <NavigationAndFooter hide_toc={hide_toc}>
      {header}
      <TabStateProvider>
        <article style={{ minHeight: `calc(100vh - ${top}px)` }}>{children}</article>
      </TabStateProvider>
    </NavigationAndFooter>
  );
}
