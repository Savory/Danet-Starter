import { TodoController } from './controller.ts';
import { TodoService } from './service.ts';
import { Module } from '../deps.ts';

@Module({
  controllers: [TodoController],
  injectables: [TodoService]
})
export class TodoModule {}
