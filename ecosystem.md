---
title: Projects & Ecosystem Overview
description: The MyST markdown ecosystem is evolving, with mature tools for Python and Sphinx, which support projects like Jupyter Book. You can also use MyST directly in the browser or Jupyter Lab using mystjs.
thumbnail: thumbnails/index.png
---

```{important}
# Overview

The MyST ecosystem is evolving, with mature tools for Python and Sphinx, which support projects
like [JupyterBook](https://jupyterbook.org).

The [ExecutableBooks](https://executablebooks.org/) team is creating a [specification for MyST](/docs/spec),
to allow parsers and renderers in many different tools and ecosystems, including in Javascript.
The [mystjs project](/docs/mystjs) is in beta and explores a MyST implementation in JavaScript
and will change significantly and rapidly.
```

### Projects and Ecosystem

MyST can be rendered and transformed by a variety of tools.

::::{grid} 1 1 2 3

:::{card}
:link: https://jupyterbook.org
**Jupyter Book**
^^^
Build beautiful, publication-quality books and documents from computational content.
+++
Go to Project »
:::

:::{card}
:link: https://myst-parser.readthedocs.io/
**Python Parser**
^^^
Use the Python parser if you are working with Sphinx, JupyterBook or need to access through Python.
+++
Go to Project »
:::

:::{card}
:link: /docs/mystjs
**Javascript Parser**
^^^
Use the Javascript parser to create interactive online articles, export to LaTeX, PDF or Word documents.
+++
Go to Project »
:::

:::{card}
:link: https://github.com/executablebooks/jupyterlab-myst
**JupyterLab**
^^^
Write and render MyST markup directly in Jupyter Lab.
+++
Go to Tool »
:::

:::{card}
:link: https://marketplace.visualstudio.com/items?itemName=ExecutableBookProject.myst-highlight
**VSCode**
^^^
Write, render and preview MyST markup directly in VSCode.
+++
Go to Tool »
:::

:::{card}
:link: https://curvenote.com/for/writing
**Curvenote**
^^^
Author MyST content and export or publish online using the CLI.

+++
Go to Tool »
:::
::::

## Python & Sphinx

Use MyST in your Sphinx or Docutils software documentation:

::::{grid} 1 1 2 3

:::{card}
:link: https://myst-parser.readthedocs.io/
**Sphinx compatible**
^^^
Use the MyST role and directive syntax to harness the full capability of Sphinx including all existing Sphinx extensions.
+++
Go to Project »
:::

:::{card}
:link: https://rst-to-myst.readthedocs.io/en/latest/index.html
**Onboard from RST**
^^^
Convert your RST to MyST using this lossless converter, which is designed to be a fault tolerant to get your whole project onto MyST Markdown.
+++
Migrate from RST »
:::

:::{card}
:link: https://myst-parser.readthedocs.io/
**Highly Configurable**
^^^
Configure MyST-parser at global and individual document levelss and access extended syntax features.
+++
Go to Project »
:::

::::

:::{card}
:link: https://myst-parser.readthedocs.io/
**Python MyST Parser**
^^^
Use the MyST role and directive syntax to harness the full capability of Sphinx including all existing Sphinx extensions.
+++
Go to Project »
:::

:::{card}
:link: https://jupyterbook.org
**Jupyter Book**
^^^
Build beautiful, publication-quality books and documents from computational content.
+++
Go to Project »
:::

## Javascript

```{warning}
# `mystjs` is in Beta

The [mystjs project](/docs/mystjs) is in beta and explores a MyST implementation in JavaScript
and will change significantly and rapidly.
```

:::{card}
:link: /docs/mystjs
`mystjs` **MyST Javascript Tools**
^^^

Render your MyST documents as Scientific PDFs, Microsoft Word documents or websites.
+++
See Project »
:::

:::{card}
:link: /docs/jtex
`jtex` **LaTeX Templates**
^^^
Easily create and contribute data-driven templates using $\LaTeX$.
+++
Contribute a Template »
:::

## MyST Specification

:::{card}
:link: /docs/spec
`myst-spec` **MyST Specification**
^^^

Documentation and test suites for the MyST markup language and resulting abstract syntax trees.

+++
See Spec »
:::
