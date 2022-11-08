import { AppModule } from './app.module.ts';
import { DanetApplication } from 'danet/mod.ts';
import { config } from 'dotenv/mod.ts';
import { loggerMiddleware } from './logger.middleware.ts';

export const bootstrap = async () => {
  config({ export: true });
  const application = new DanetApplication();
  await application.init(AppModule);
  application.addGlobalMiddlewares(loggerMiddleware);
  return application;
};
