import { AppModule } from './app.module.ts';
import { DanetApplication } from './deps.ts';

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(AppModule);
  return application;
}

