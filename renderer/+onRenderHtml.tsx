import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import { Layout } from './Layout.js';
import { ColorSchemeScript as MantineColorSchemeScript } from '@mantine/core';
import ReactDOMServer from 'react-dom/server';
import type { PageContextServer } from './types.js';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/require-await
async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error('My render() hook expects pageContext.Page to be defined');
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const pageHtml = ReactDOMServer.renderToString(
    <Layout>
      <Page {...pageProps} />
    </Layout>,
  );

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const ColorSchemeScript = ReactDOMServer.renderToString(
    <MantineColorSchemeScript />,
  );

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports;
  const title = documentProps?.title || 'Next bahn.expert';
  const desc = documentProps?.description || 'Next Gen bahn.expert';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(ColorSchemeScript)}
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  };
}

export default render;
