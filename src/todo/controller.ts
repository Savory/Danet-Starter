import { Body, Controller, Delete, Get, Param, Post, Put } from 'danet/mod.ts';
import { Todo } from './class.ts';
import { TodoService } from './service.ts';

@Controller('todo')
export class TodoController {
  constructor(public todoService: TodoService) {
  }

  @Get()
  async getAllTodo() {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getTodoById(@Param('id') todoId: string) {
    return this.todoService.getById(todoId);
  }

  @Post()
  async createTodo(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(@Param('id') todoId: string, @Body() todo: Todo) {
    return this.todoService.update(todoId, todo);
  }

  @Delete(':id')
  async deleteOne(@Param('id') todoId: string) {
    return this.todoService.deleteOneById(todoId);
  }
}
