import { AppModule } from "./app.module.ts";
import { config, DanetApplication } from "./deps.ts";
export const bootstrap = async () => {
  config({ export: true });
  const application = new DanetApplication();
  await application.init(AppModule);
  return application;
};
