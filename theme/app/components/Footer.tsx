import { MastodonIcon, TwitterIcon, GithubIcon, DiscordIcon } from '@scienceicons/react/24/solid';
import { Link } from '@remix-run/react';
import Logo from './logo-wide.svg';
import LogoDark from './logo-wide-dark.svg';
import JupyterLogo from './jupyter-logo-wide.svg';
import JupyterLogoDark from './jupyter-logo-wide-dark.svg';
import classNames from 'classnames';

function SocialIcons() {
  return (
    <div className="grid grid-flow-col gap-2 my-2 text-slate-600 dark:text-white w-fit">
      <a
        href="https://twitter.com/mystmarkdown"
        target="_blank"
        className="p-1"
        rel="noreferrer"
        title="Follow us on Twitter"
      >
        <TwitterIcon className="w-5 h-5" />
      </a>
      <a
        href="https://fosstodon.org/@myst_tools"
        target="_blank"
        className="p-1"
        rel="me noreferrer"
        title="Follow us on Mastodon"
      >
        <MastodonIcon className="w-5 h-5" />
      </a>
      <a
        href="https://github.com/executablebooks"
        target="_blank"
        className="p-1"
        rel="noreferrer"
        title="Fork us on GitHub"
      >
        <GithubIcon className="w-5 h-5" />
      </a>
      <a
        href="https://discord.mystmd.org"
        target="_blank"
        className="p-1"
        rel="noreferrer"
        title="Talk on Discord"
      >
        <DiscordIcon className="w-5 h-5" />
      </a>
    </div>
  );
}

export function JupyterFooter() {
  return (
    <div className="px-6 py-3 article-grid col-screen bg-slate-100 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-2 col-screen md:grid-cols-12 text-neutral-800 dark:text-gray-100">
        <div className="text-center md:text-left md:col-span-4">
          <a
            href="https://jupyter.org"
            target="_blank"
            rel="noreferrer"
            className="block mx-auto w-fit md:mx-0"
          >
            <img src={JupyterLogo} className="h-9 dark:hidden" alt="Jupyter Project" />
            <img src={JupyterLogoDark} className="hidden h-9 dark:block" alt="Jupyter Project" />
            <span className="sr-only">Jupyter Project</span>
          </a>
        </div>
        <div className="m-auto text-center md:col-span-4">
          <a
            href="https://compass.jupyterbook.org/team"
            target="_blank"
            rel="noreferrer"
            className="text-sm after:content-['\a0\2219\a0']"
          >
            Our Team
          </a>
          <a
            href="https://compass.jupyterbook.org"
            target="_blank"
            rel="noreferrer"
            className="text-sm after:content-['\a0\2219\a0']"
          >
            Compass
          </a>
          <a
            href="https://executablebooks.org/en/latest/blog"
            target="_blank"
            rel="noreferrer"
            className="text-sm"
          >
            Blog
          </a>
        </div>
        <div className="m-auto text-right md:mx-0 md:col-span-4">
          <a
            href="https://compass.jupyterbook.org/code-of-conduct"
            target="_blank"
            rel="noreferrer"
            className="text-sm"
          >
            Code of Conduct
          </a>
        </div>
      </div>
    </div>
  );
}

export function Footer({ tight }: { tight?: boolean }) {
  return (
    <section className={classNames('col-screen article-grid', { 'mt-10': !tight, 'mt-0': tight })}>
      <div
        className={classNames('bg-white dark:bg-slate-950 shadow-2xl col-screen article-grid', {
          'shadow-orange-400 dark:shadow-orange-600 mt-5 md:mt-12': !tight,
          'border-t border-slate-100 dark:border-slate-800': tight,
        })}
      >
        <div className="my-10 col-page">
          <div className="flex flex-col items-center w-full p-2 my-4 sm:p-5 lg:flex-row lg:flex-wrap">
            <div>
              <a href="/" className="inline-block">
                <img src={Logo} className="w-[200px] dark:hidden" alt="MyST Markdown" />
                <img src={LogoDark} className="w-[200px] hidden dark:block" alt="MyST Markdown" />
                <span className="sr-only">MyST Markdown</span>
              </a>
              <div className="max-w-sm font-light prose dark:text-white">
                Community-driven tools for the future of technical communication and publication,
                part of{' '}
                <a href="https://jupyter.org" target="_blank">
                  Jupyter
                </a>
                .
              </div>
              <SocialIcons />
            </div>
            <div className="mt-6 font-light lg:mt-0 lg:pl-12 grow text-md dark:text-white">
              <div className="flex flex-row">
                <div className="hidden grow lg:block"></div>
                <ul className="mr-10 leading-loose lg:px-4">
                  <li>
                    <Link to="/sandbox" prefetch="intent">
                      Try MyST
                    </Link>
                  </li>
                  <li>
                    <Link to="/guide" prefetch="intent">
                      Quickstart Guide
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/myst-templates"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Templates
                    </a>
                  </li>
                  <li>
                    <Link to="/overview/ecosystem" prefetch="intent">
                      Ecosystem
                    </Link>
                  </li>
                </ul>
                <ul className="px-4 leading-loose">
                  <li>
                    <a
                      href="https://executablebooks.org/en/latest/gallery/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <Link to="/spec" prefetch="intent">
                      Specification
                    </Link>
                  </li>
                  <li>
                    <a href="https://mep.mystmd.org" target="_blank" rel="noopener noreferrer">
                      Enhancement Proposals
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://myst-parser.readthedocs.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Python Tools
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JupyterFooter />
    </section>
  );
}
