import { HttpContext, NextFunction, Logger } from 'danet/mod.ts';

const logger = new Logger('Logger');

export let loggerMiddleware = async (ctx: HttpContext, next: NextFunction) => {
  logger.log(`${ctx.request.method} - ${ctx.request.url.pathname}`);
  await next();
}