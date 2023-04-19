import { MastadonIcon, TwitterIcon, GithubIcon } from '@scienceicons/react/24/solid';
import { Link } from '@remix-run/react';
import Logo from './logo-wide.svg';
import LogoDark from './logo-wide-dark.svg';
import EBPLogo from './ebp-logo-wide.svg';
import EBPLogoDark from './ebp-logo-wide-dark.svg';
import classNames from 'classnames';

function SocialIcons() {
  return (
    <div className="grid grid-flow-col gap-2 my-2 text-slate-600 dark:text-white w-fit">
      <a
        href="https://twitter.com/myst_tools"
        target="_blank"
        className="p-1"
        rel="noreferrer"
        title="Follow us on Twitter"
      >
        <TwitterIcon className="h-5 w-5" />
      </a>
      <a
        href="https://fosstodon.org/@myst_tools"
        target="_blank"
        className="p-1"
        rel="me noreferrer"
        title="Follow us on Mastodon"
      >
        <MastadonIcon className="h-5 w-5" />
      </a>
      <a
        href="https://github.com/executablebooks"
        target="_blank"
        className="p-1"
        rel="noreferrer"
        title="Fork us on GitHub"
      >
        <GithubIcon className="h-5 w-5" />
      </a>
    </div>
  );
}

export function ExecutableBooksFooter() {
  return (
    <div className="article-grid col-screen bg-slate-100 dark:bg-zinc-900 py-3 px-6">
      <div className="col-screen grid grid-cols-1 md:grid-cols-12 gap-2 text-neutral-800 dark:text-gray-100">
        <div className="text-center md:text-left md:col-span-4">
          <a
            href="https://executablebooks.org"
            target="_blank"
            rel="noreferrer"
            className="block w-fit mx-auto md:mx-0"
          >
            <img src={EBPLogo} className="h-9 dark:hidden" alt="Executable Books Project" />
            <img
              src={EBPLogoDark}
              className="h-9 hidden dark:block"
              alt="Executable Books Project"
            />
            <span className="sr-only">Executable Books Project</span>
          </a>
        </div>
        <div className="m-auto md:col-span-4 text-center">
          <a
            href="https://compass.executablebooks.org/en/latest/team/index.html"
            target="_blank"
            rel="noreferrer"
            className="text-sm after:content-['\a0\2219\a0']"
          >
            Our Team
          </a>
          <a
            href="https://compass.executablebooks.org"
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
        <div className="m-auto md:mx-0 md:col-span-4 text-right">
          <a
            href="https://compass.executablebooks.org/en/latest/code-of-conduct.html"
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
        <div className="col-page my-10">
          <div className="w-full p-2 my-4 sm:p-5 flex flex-col lg:flex-row lg:flex-wrap items-center">
            <div>
              <a href="/" className="inline-block">
                <img src={Logo} className="w-[200px] dark:hidden" alt="MyST Tools" />
                <img src={LogoDark} className="w-[200px] hidden dark:block" alt="MyST Tools" />
                <span className="sr-only">MyST Tools</span>
              </a>
              <div className="prose font-light max-w-sm dark:text-white">
                Community-driven tools for the future of technical communication and publication
              </div>
              <SocialIcons />
            </div>
            <div className="mt-6 lg:mt-0 lg:pl-12 grow text-md font-light dark:text-white">
              <div className="flex flex-row">
                <div className="grow hidden lg:block"></div>
                <ul className="lg:px-4 mr-10 leading-loose">
                  <li>
                    <Link to="/sandbox" prefetch="intent">
                      Try MyST
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs/mystjs" prefetch="intent">
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
                    <Link to="/ecosystem" prefetch="intent">
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
                    <Link to="/docs/spec" prefetch="intent">
                      Specification
                    </Link>
                  </li>
                  <li>
                    <a href="https://mep.myst-tools.org" target="_blank" rel="noopener noreferrer">
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
      <ExecutableBooksFooter />
    </section>
  );
}
