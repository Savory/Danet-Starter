import { AppModule } from './app.module.ts';
import { DanetApplication } from 'danet/mod.ts';
import { config } from 'dotenv/mod.ts';

export const bootstrap = async () => {
  config({ export: true });
  const application = new DanetApplication();
  await application.init(AppModule);
  return application;
};
