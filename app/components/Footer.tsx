import { MastadonIcon, TwitterIcon, GithubIcon } from '@scienceicons/react/24/solid';
import { Link } from '@remix-run/react';
import Logo from './logo-wide-text.svg';
import classnames from 'classnames';

export function Footer({ tight }: { tight?: boolean }) {
  return (
    <section>
      <div className={classnames('bg-[#f3f3f3]', { 'mt-5 md:mt-12': !tight, 'mt-0': tight })}>
        <div className="column-page p-2 sm:p-5 lg:px-[150px] xl:px-[300px] flex flex-row flex-wrap items-center">
          <div>
            <a href="/" className="inline-block">
              <img src={Logo} className="w-[200px]" alt="MyST Tools" />
              <span className="sr-only">MyST Tools</span>
            </a>
          </div>
          <div className="pl-12 flex-grow">
            <div className="font-semibold">MyST Markdown Tools</div>
            <ul className="pl-2">
              <li>
                <Link to="/" prefetch="intent">
                  Overview
                </Link>
              </li>
              <li>
                <a href="https://executablebooks.org" target="_blank" rel="noopener noreferrer">
                  Executable Books Community
                </a>
              </li>
              <li>
                <a
                  href="https://executablebooks.org/en/latest/gallery/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>
          <div className="pl-12 flex-grow">
            <div className="font-semibold">Documentation</div>
            <ul className="pl-2">
              <li>
                <Link to="/ecosystem" prefetch="intent">
                  Projects &amp; Ecosystem
                </Link>
              </li>
              <li>
                <Link to="/docs/mystjs" prefetch="intent">
                  MyST CLI
                </Link>
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
          <div className="flex flex-row">
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
        </div>
      </div>
    </section>
  );
}
