import { Module } from './deps.ts';
import { TodoModule } from './todo/module.ts';

@Module({
  imports: [TodoModule]
})
export class AppModule {}
