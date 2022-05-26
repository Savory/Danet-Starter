import { Injectable } from '../deps.ts';
import { Todo } from './class.ts';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  getAll() {
      return [...this.todos];
  }

  getById(id: string) {
    const todo = this.todos.find((t: Todo) => t.id === id);
    if (todo)
      return {...todo}
    return null;
  }

  create(todo: Omit<Todo, 'id'>) {
    const createdTodo = new Todo(todo.title, todo.content);
    this.todos.push(createdTodo);
    return createdTodo;
  }

  update(todoId: string, todo: Todo) {
    this.todos.forEach((t: Todo) => {
      if (t.id === todoId) {
        t.title = todo.title;
        t.content = todo.content;
      }
    });
  }

  deleteOneById(todoId: string) {
    const todoIndex = this.todos.findIndex((t: Todo) => t.id === todoId);
    this.todos.splice(todoIndex, 1);
  }

  deleteAll() {
    this.todos = [];
  }
}
