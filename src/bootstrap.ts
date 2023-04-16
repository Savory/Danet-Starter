import { AppModule } from './app.module.ts';
import { DanetApplication } from 'danet/mod.ts';
import { configAsync } from 'dotenv/mod.ts';
import { loggerMiddleware } from './logger.middleware.ts';
import { SpecBuilder, SwaggerModule } from 'danet_swagger/mod.ts';
import twindConfig from "./dashboard/twind.config.ts";
import twindPlugin from "$fresh/plugins/twind.ts";

export const application = new DanetApplication();
export const bootstrap = async () => {
  await configAsync({ export: true });
  const freshAppDirectory = new URL('./dashboard/', import.meta.url);
  await application.enableFreshOnRoot(freshAppDirectory, '/api', { plugins: [twindPlugin(twindConfig)] });


  await application.init(AppModule);
  const spec = new SpecBuilder()
    .setTitle('Todo')
    .setDescription('The todo API')
    .setVersion('1.0')
    .build();
  const document = await SwaggerModule.createDocument(application, spec);
  await SwaggerModule.setup('documentation', application, document);
  application.addGlobalMiddlewares(loggerMiddleware);
  return application;
};
