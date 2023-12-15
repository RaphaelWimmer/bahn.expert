import Router from '@koa/router';

const r = new Router();

r.get('/test', (ctx) => {
  ctx.body = 'tesinssgt';
});

export default r;
