import { hydrateRoot } from 'react-dom/client';
import { Layout } from './Layout.js';
import type { OnRenderClientSync } from 'vike/types';

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/require-await
export const onRenderClient: OnRenderClientSync = (pageContext) => {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined',
    );
  const root = document.getElementById('react-root');
  if (!root) throw new Error('DOM element #react-root not found');
  hydrateRoot(
    root,
    <Layout>
      <Page {...pageProps} />
    </Layout>,
  );
};
