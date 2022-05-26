import { Body, Controller, Delete, Get, Param, Post, Put } from '../deps.ts';
import { Todo } from './class.ts';
import { TodoService } from './service.ts';

@Controller('todo')
export class TodoController {
  constructor(public todoService: TodoService) {
  }

  @Get()
  getAllTodo() {
    return this.todoService.getAll();
  }

  @Get(':id')
  getTodoById(@Param('id') todoId: string) {
    return this.todoService.getById(todoId);
  }

  @Post()
  createTodo(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @Put(':id')
  updateTodo(@Param('id') todoId: string, @Body() todo: Todo) {
    return this.todoService.update(todoId, todo);
  }

  @Delete(':id')
  deleteOne(@Param('id') todoId: string) {
    return this.todoService.deleteOneById(todoId);
  }
}
