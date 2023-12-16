import { dangerouslySkipEscape, escapeInject } from 'vike/server';
import { Layout } from './Layout.js';
import { ColorSchemeScript as MantineColorSchemeScript } from '@mantine/core';
import ReactDOMServer from 'react-dom/server';
import { renderToStream } from 'react-streaming/server';
import { OnRenderHtmlAsync } from 'vike/types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/require-await
export const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page, pageProps, userAgent, rawBaseUrl } = pageContext;

  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error('My render() hook expects pageContext.Page to be defined');
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const renderedStream = await renderToStream(
    <Layout>
      <Page {...pageProps} />
    </Layout>,
    {
      userAgent,
    },
  );

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const ColorSchemeScript = ReactDOMServer.renderToString(
    <MantineColorSchemeScript />,
  );

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports;
  const title = documentProps?.title || 'Next bahn.expert';
  const desc = documentProps?.description || 'Next Gen bahn.expert';
  const statPart =
    process.env.NODE_ENV === 'production'
      ? `<script async defer data-api="https://${rawBaseUrl}/api/event" data-domain="${rawBaseUrl}" src="https://${rawBaseUrl}/js/script.js"></script>`
      : '';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${statPart}
        <meta charSet="utf-8" >
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width, viewport-fit=contain">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" >
        <meta name="robots" content="all" >
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=dABYO4lXNJ">
        <link rel="manifest" href="/site.webmanifest?v=dABYO4lXNJ">
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=dABYO4lXNJ" color="#000000">
        <link rel="shortcut icon" href="/favicon.svg?v=dABYO4lXNJ">
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(ColorSchemeScript)}
      </head>
      <body>
      <a rel="me" style="display:none" href="https://chaos.social/@marudor"></a>
        <div id="react-root">${renderedStream}</div>
      </body>
    </html>`;

  return documentHtml;
};
