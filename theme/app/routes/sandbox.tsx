import { FrontmatterBlock } from '@myst-theme/frontmatter';
import { ErrorDocumentNotFound, ErrorUnhandled, getMetaTagsForArticle } from '@myst-theme/site';
import { ArticleAndNavigation, NavigationAndFooter } from '../components/Page';
import { TabStateProvider, UiStateProvider } from '@myst-theme/providers';
import { MySTRenderer } from 'myst-demo';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { useEffect, useState } from 'react';

export const meta: V2_MetaFunction<typeof loader> = (args) => {
  return getMetaTagsForArticle({
    origin: '',
    url: args.location.pathname,
    title: 'MyST Markdown Sandbox',
    description: 'Try MyST Markdown directly in your browser.',
  });
};

// https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
function fromBinary(binary: string) {
  const bytes = Uint8Array.from({ length: binary.length }, (element, index) =>
    binary.charCodeAt(index)
  );
  const charCodes = new Uint16Array(bytes.buffer);

  let result = '';
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
}

function toBinary(string: string) {
  const codeUnits = Uint16Array.from({ length: string.length }, (element, index) =>
    string.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);

  let result = '';
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const myst = url.searchParams.get('myst');
  const tab = url.searchParams.get('tab');
  const srcURL = url.searchParams.get('url');

  let data;
  if (srcURL) {
    const response = await fetch(srcURL);
    data = await response.text();
  } else {
    data = myst ? fromBinary(atob(myst)) : undefined;
  }
  return json({ data, tab });
};

const value = `---
title: Working with MyST Markdown
subtitle: A live demo
authors:
  - name: Rowan Cockett
    orcid: 0000-0002-7859-8394
    affiliations:
      - Executable Books
license: CC-BY-4.0
---

MyST makes Markdown more _extensible_ & **powerful** to support an
ecosystem of tools for computational narratives, technical documentation,
and open scientific communication. You can **edit this demo** including the [frontmatter][myst-frontmatter] to change the title!!

:::{important} Our Values
We believe in a community-driven approach of open-source tools that are
composable and extensible. You can find out how to be involved in developing MyST Markdown by getting involved in the [ExecutableBooks][executable-books] project.
:::

MyST allows you to create figures with rich cross-references, scientific citations, and export to many commonly used document formats, including ([websites like this one][websites], [PDFs & $\\LaTeX$][latex], [Microsoft Word][word], and [JATS XML][jats]).

For example, we have included a figure below ([](#my-fig)), [](#example-table) as well as [](#maxwell), a cross-reference to Maxwell's equations.
You can click on these and see the preview of the reference immediately.

## Including Figures and Images

:::{figure} https://source.unsplash.com/random/400x200?beach,ocean
:name: my-fig
:alt: Random image of the beach or ocean!

Relaxing at the beach 🏝 🌊 😎
:::

## Including Math and Equations

\`\`\`{math}
:label: maxwell
\\begin{aligned}
\\nabla \\times \\vec{e}+\\frac{\\partial \\vec{b}}{\\partial t}&=0 \\\\
\\nabla \\times \\vec{h}-\\vec{j}&=\\vec{s}\\_{e}
\\end{aligned}
\`\`\`

## Including Tables

:::{list-table} This is a nice table!
:header-rows: 1
:name: example-table

* - Training
  - Validation
* - 0
  - 5
* - 13720
  - 2744
:::

## Callouts

:::{note}
:class: dropdown
This is initially hidden, and can be clicked to be opened when you are viewing the content.
:::

% These are some links used above to keep things clean!
[myst-frontmatter]: https://mystmd.org/guide/frontmatter
[executable-books]: https://executablebooks.org/
[latex]: https://mystmd.org/guide/creating-pdf-documents
[websites]: https://mystmd.org/guide/quickstart-myst-websites
[word]: https://mystmd.org/guide/creating-word-documents
[jats]: https://mystmd.org/guide/creating-jats-xml
`;

export default function ContentPage() {
  const [copied, setCopied] = useState(false);
  const { data, tab } = useLoaderData();

  const copy = () => {
    const tab = Array(...document.getElementsByTagName('button'))
      .filter((el) => el.ariaPressed === 'true')[0]
      .innerText.toLowerCase();
    const encoded = btoa(toBinary(document.getElementsByTagName('textarea')[0].value));
    const params = new URLSearchParams(location.search);
    params.set('tab', tab);
    params.set('myst', encoded);
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  useEffect(() => {
    if (!tab) return;
    setTimeout(() =>
      Array(...document.getElementsByTagName('button'))
        .find((el) => el.innerText.toLowerCase() === tab)
        ?.click()
    );
  }, [tab]);

  return (
    <NavigationAndFooter tightFooter mobileNavOnly>
      <TabStateProvider>
        <UiStateProvider>
          <main className="relative p-0 article">
            <MySTRenderer
              value={data ?? value}
              column
              fullscreen
              captureTab
              className="h-[calc(100vh-60px)]"
              TitleBlock={FrontmatterBlock}
            />
            <button
              className="px-2 py-1 bg-blue-800 hover:bg-blue-900 text-white absolute top-[10px] left-2 border dark:border-slate-600 text-sm"
              onClick={copy}
            >
              {copied ? 'Copied!!' : 'Share'}
            </button>
          </main>
        </UiStateProvider>
      </TabStateProvider>
    </NavigationAndFooter>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <ArticleAndNavigation>
      <main className="article-content">
        <main className="article">
          {isRouteErrorResponse(error) ? (
            <ErrorDocumentNotFound />
          ) : (
            <ErrorUnhandled error={error as any} />
          )}
        </main>
      </main>
    </ArticleAndNavigation>
  );
}
