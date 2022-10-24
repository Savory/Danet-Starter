import { Repository } from '../database/repository.ts';
import { Todo } from './class.ts';

export class InMemoryTodoRepository implements Repository<Todo> {
  private todos: Todo[] = [];
  async getAll(): Promise<Todo[]> {
    return [...this.todos];
  }

  async getById(id: string) {
    const todo = this.todos.find((t: Todo) => t._id === id);
    if (todo) {
      return { ...todo } as Todo;
    }
    return undefined;
  }

  async create(todo: Omit<Todo, '_id'>) {
    const createdTodo = new Todo(todo.title, todo.content);
    this.todos.push(createdTodo);
    return createdTodo;
  }

  async updateOne(todoId: string, todo: Todo) {
    this.todos.forEach((t: Todo) => {
      if (t._id === todoId) {
        t.title = todo.title;
        t.content = todo.content;
      }
    });
    return undefined;
  }

  async deleteOne(todoId: string) {
    const todoIndex = this.todos.findIndex((t: Todo) => t._id === todoId);
    this.todos.splice(todoIndex, 1);
  }

  async deleteAll() {
    this.todos = [];
  }
}
