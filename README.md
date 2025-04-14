# mystmd.org

This repository holds the theme for https://mystmd.org as well as the content for the **landing/overview pages** of the website.

The theme is a custom [Remix](https://remix.run) application that depends on [myst-theme](https://github.com/executablebooks/myst-theme) components. The web application brings together documentation from multiple different projects and provides a custom splash page, sandbox and search experience.

## How to update the content at mystmd.org

This repository does not control the deployment of content on <mystmd.org>. For instructions on how to update the live deployment at mystmd.org, see the [MyST documentation contributing guide](https://mystmd.org/guide/contribute-docs).

## Local Development

To see the theme locally:

```
cd theme
npm install
npm run start
```

This currently loads content off of the curvenote CDN for pages, which may be changed in the future.
