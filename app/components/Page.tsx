import { DEFAULT_NAV_HEIGHT, Navigation, useTocHeight } from '@myst-theme/site';
import {
  SiteProvider,
  TabStateProvider,
  UiStateProvider,
  useSiteManifest,
} from '@myst-theme/providers';
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

const value = `MyST makes Markdown more _extensible_ & **powerful** to support an
ecosystem of tools for computational narratives, technical documentation,
and open scientific communication.

:::{important} Our Values
We believe in a community-driven approach of open-source tools that are
composable and extensible.
:::
`;

export function HeaderSection() {
  return (
    <>
      <div className="article article-grid article-subgrid-gap pt-6 bg-slate-100">
        <div className="col-page-inset text-center">
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
            href="/docs/mystjs"
          >
            Get Started
          </a>
        </div>
      </div>
      <div
        className="col-screen h-[30vw] -mb-[27vw] w-full bg-no-repeat bg-contain bg-top pointer-events-none"
        style={{ backgroundImage: `url(${HeaderImage})` }}
      ></div>
      <div className="article article-grid article-grid-gap relative mb-[25px]">
        {/* This is desktop */}
        <MySTRenderer
          value={value}
          column
          fullscreen
          captureTab
          className="hidden md:grid md:h-[400px] xl:h-[375px] col-screen-inset lg:mx-10 bg-white/80 backdrop-blur shadow"
        />
        {/* This is mobile */}
        <MySTRenderer value={value} fullscreen captureTab className="block md:hidden mt-5 shadow" />
        <a
          className="hidden md:block col-screen-inset lg:mx-10 px-2 py-1 bg-blue-800 hover:bg-blue-900 text-white absolute top-[10px] left-2 border dark:border-slate-600 text-sm no-underline"
          // onClick={copy}
          href="/sandbox"
        >
          Open Sandbox
        </a>
        <div className="col-page-inset text-center">
          <div className="rounded-lg font-normal text-sm inline-block py-1 px-2 my-3 w-fit">
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
  top = DEFAULT_NAV_HEIGHT,
  tightFooter,
  hide_toc,
  projectSlug,
  siteConfig,
}: {
  top?: number;
  children: React.ReactNode;
  tightFooter?: boolean;
  hide_toc?: boolean;
  projectSlug?: string;
  siteConfig?: SiteManifest;
}) {
  const siteConfigDefault = useSiteManifest();
  const { container, toc } = useTocHeight<HTMLDivElement>(top);
  return (
    <UiStateProvider>
      <Navigation top={top} tocRef={toc} hide_toc={hide_toc} projectSlug={projectSlug}>
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
