import { Link, NavLink } from '@remix-run/react';
import { Fragment } from 'react';
import classNames from 'classnames';
import { Menu, Transition } from '@headlessui/react';
import type { SiteManifest, SiteNavItem } from 'myst-config';
import { LoadingBar, ThemeButton } from '@myst-theme/site';
import { useSiteManifest } from '@myst-theme/providers';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import twitter from '~/icons/twitter.svg';
import github from '~/icons/github.svg';
import HeaderLogo from './logo-wide.svg';

export const DEFAULT_NAV_HEIGHT = 60;

function ExternalOrInternalLink({
  to,
  className,
  children,
  nav,
  prefetch = 'intent',
}: {
  to: string;
  className?: string | ((props: { isActive: boolean }) => string);
  children: React.ReactNode;
  nav?: boolean;
  prefetch?: 'intent' | 'render' | 'none';
}) {
  const staticClass = typeof className === 'function' ? className({ isActive: false }) : className;
  if (to.startsWith('http') || to.startsWith('mailto:')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={staticClass}>
        {children}
      </a>
    );
  }
  if (nav) {
    return (
      <NavLink prefetch={prefetch} to={to} className={className}>
        {children}
      </NavLink>
    );
  }
  return (
    <Link prefetch={prefetch} to={to} className={staticClass}>
      {children}
    </Link>
  );
}

function NavItem({ item }: { item: SiteNavItem }) {
  if (!('children' in item)) {
    return (
      <div className="relative grow-0 inline-block mx-2">
        {item.url ? (
          <ExternalOrInternalLink
            nav
            to={item.url}
            className={({ isActive }) =>
              classNames(
                'inline-flex items-center justify-center w-full mx-2 py-1 text-md font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                {
                  'border-b border-stone-200': isActive,
                }
              )
            }
          >
            {item.title}
          </ExternalOrInternalLink>
        ) : (
          <>{item.title}</>
        )}
      </div>
    );
  }
  return (
    <Menu as="div" className="relative grow-0 inline-block mx-2">
      <div className="inline-block">
        <Menu.Button className="inline-flex items-center justify-center w-full mx-2 py-1 text-md font-medium text-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <span>{item.title}</span>
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-4 mt-2 w-48 rounded-sm shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {item.children?.map((action) => (
            <Menu.Item key={action.url}>
              {/* This is really ugly, BUT, the action needs to be defined HERE or the click away doesn't work for some reason */}
              {action.url?.startsWith('http') ? (
                <a
                  href={action.url || ''}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {action.title}
                </a>
              ) : (
                <NavLink
                  to={action.url || ''}
                  className={({ isActive }) =>
                    classNames(
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black',
                      {
                        'text-black font-bold': isActive,
                      }
                    )
                  }
                >
                  {action.title}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function NavItems({ nav }: { nav?: SiteManifest['nav'] }) {
  if (!nav) return null;
  return (
    <div className="text-md flex-grow hidden lg:block">
      {nav.map((item) => {
        return <NavItem key={'url' in item ? item.url : item.title} item={item} />;
      })}
    </div>
  );
}

function HomeLink() {
  return (
    <Link
      className="flex items-center text-black w-fit ml-3 md:ml-5 xl:ml-7"
      to="/"
      prefetch="intent"
    >
      <img src={HeaderLogo} className="h-9 mr-3" alt="MyST Markdown Tools" height="2.25rem"></img>
    </Link>
  );
}

function ThemeTag() {
  return (
    <div className="bg-[#2B2A2D] absolute top-0 right-4 sm:right-0 flex flex-row p-1">
      <ThemeButton className="inline-block ml-1 h-6 w-6 self-center" />
      <a
        href="https://twitter.com/executablebooks"
        target="_blank"
        className="p-1 invert"
        rel="noreferrer"
      >
        <img src={twitter} loading="lazy" width="25" alt="Follow us on Twitter" />
      </a>
      <a
        href="https://github.com/executablebooks"
        target="_blank"
        className="p-1 invert"
        rel="noreferrer"
      >
        <img src={github} loading="lazy" width="25" alt="Fork us on GitHub" />
      </a>
    </div>
  );
}

export function TopNav() {
  // const [open, setOpen] = useNavOpen();
  const config = useSiteManifest();
  const { nav } = config ?? {};
  return (
    <div className="bg-gray-50 md:px-8 w-screen top-0 z-30 h-[60px] fixed">
      <div className=" max-w-[1440px] relative mx-auto p-3">
        <nav className="flex items-center justify-between flex-wrap">
          <div className="flex flex-row mr-2 sm:mr-7 justify-start items-center">
            {/* <div className="block xl:hidden">
              <button
                className="flex items-center text-stone-200 border-stone-400 hover:text-black"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="fill-current h-8 w-8 p-1" />
              </button>
            </div> */}
            <HomeLink />
          </div>
          <div className="flex-grow flex items-center w-auto">
            <NavItems nav={nav} />
            <div className="block flex-grow"></div>
          </div>
        </nav>
        <ThemeTag />
      </div>
      <LoadingBar />
    </div>
  );
}
