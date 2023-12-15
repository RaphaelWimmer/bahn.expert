import { AllowedHafasProfile } from '#/types/HAFAS/index.js';
import { ApiRequestMetric } from '#/server/admin/index.js';
import { RegisterRoutes } from './routes.js';
import Router from '@koa/router';

const router = new Router();

router.all('/api/hafas/(.*)', (ctx, next) => {
  const hafasProfile: any = ctx.query.profile;

  if (
    hafasProfile &&
    !Object.values(AllowedHafasProfile).includes(hafasProfile)
  ) {
    delete ctx.query.profile;
  }
  ctx.response.set('hafasProfile', ctx.query.profile || AllowedHafasProfile.DB);

  return next();
});

router.use(async (ctx, next) => {
  if (!ctx._matchedRoute) {
    return await next();
  }
  const end = ApiRequestMetric.startTimer();
  const result = await next();
  end({
    route: ctx._matchedRoute.toString(),
    status: ctx.status,
  });

  return result;
});

RegisterRoutes(router);

export default router;
