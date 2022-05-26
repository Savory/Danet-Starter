import { DanetApplication } from './deps.ts';
import { TodoModule } from './todo/module.ts';

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(TodoModule);
  return application;
}

