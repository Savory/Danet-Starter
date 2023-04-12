import { TodoController } from './controller.ts';
import { TodoService } from './service.ts';
import { Module, TokenInjector } from 'danet/mod.ts';
import { USER_REPOSITORY } from './constant.ts';
import { InMemoryTodoRepository } from './in-memory-repository.ts';

@Module({
  controllers: [TodoController],
  injectables: [
    new TokenInjector(InMemoryTodoRepository, USER_REPOSITORY),
    TodoService,
  ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
})
export class TodoModule {}
