import { TodoController } from './controller.ts';
import { TodoService } from './service.ts';
import { Module, TokenInjector } from 'danet/mod.ts';
import { USER_REPOSITORY } from './constant.ts';
import { DatabaseModule } from '../database/module.ts';
import { PostgresService } from '../database/postgres.service.ts';
import { PostgresRepository } from './postgres-repository.ts';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  injectables: [
    new TokenInjector(PostgresRepository, USER_REPOSITORY),
    TodoService,
  ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
})
export class TodoModule {}
