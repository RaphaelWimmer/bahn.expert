import { renderPage } from 'vike/server';
import createAdmin from './admin/index.js';
import http from 'node:http';
import Koa from 'koa';
import KoaBodyparser from 'koa-bodyparser';
import KoaConnect from 'koa-connect';
import KoaStatic from 'koa-static';
import path from 'node:path';
import URL from 'node:url';
import type { Context, Middleware } from 'koa';

const isProduction = process.env.NODE_ENV === 'production';
let root = `${path.dirname(URL.fileURLToPath(import.meta.url))}/../..`;
if (isProduction) {
  root += '/client';
}

function hotHelper(getMiddleware: () => Middleware) {
  if (isProduction) {
    return getMiddleware();
  }

  return (ctx: Context, next: () => Promise<any>) => getMiddleware()(ctx, next);
}

export async function createApp(): Promise<Koa> {
  const app = new Koa();

  let apiRoutes = (await import('./API/index.js')).default;

  if (isProduction) {
    app.use(KoaStatic(root));
  } else {
    import('#/server/middleware/devWatcher.js');

    app.use(async (_ctx, next) => {
      apiRoutes = (await import('./API/index.js')).default;
      return next();
    });
    const vite = await import('vite');
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
        configFile: 'vite.config.ts',
      })
    ).middlewares;
    app.use(KoaConnect(viteDevMiddleware));
  }

  app.use(KoaBodyparser());
  // @ts-expect-error ???
  app.use(hotHelper(() => apiRoutes.routes()));
  app.use(async (ctx, next) => {
    const pageContextInit = {
      urlOriginal: ctx.originalUrl,
      userAgent: ctx.headers['user-agent'],
      rawBaseUrl: process.env.BASE_URL || 'localhost:9042',
    };
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    }

    if (httpResponse.earlyHints) {
      ctx.res.writeEarlyHints({
        link: httpResponse.earlyHints.map((e) => e.earlyHintLink),
      });
    }

    for (const [name, value] of httpResponse.headers) {
      ctx.headers[name] = value;
    }
    ctx.status = httpResponse.statusCode;
    ctx.body = httpResponse.body;
  });

  return app;
}

export async function createNodeServer(): Promise<void> {
  const port = process.env.WEB_PORT || 9042;
  const server = http.createServer();
  const app = await createApp();

  server.addListener('request', app.callback());
  server.listen(port);
  if (isProduction) {
    createAdmin();
  } else {
    // eslint-disable-next-line no-console
    console.log('running in DEV mode!');
  }
}
