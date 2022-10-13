import { TodoController } from "./controller.ts";
import { TodoService } from "./service.ts";
import { Module, TokenInjector } from "../deps.ts";
// import { InMemoryTodoRepository } from './in-memory-repository.ts';
import { USER_REPOSITORY } from "./constant.ts";
import { MongodbRepository } from "./mongodb-repository.ts";
import { DatabaseModule } from "../database/module.ts";

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  injectables: [
    new TokenInjector(MongodbRepository, USER_REPOSITORY),
    TodoService,
  ], // change mongoDbRepository by any custom repository using other database engine if needed
})
export class TodoModule {}
