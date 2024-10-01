import { Inject, Injectable } from '@danet/core';
import { Todo } from './class.ts';
import type { Repository } from '../database/repository.ts';
import { USER_REPOSITORY } from './constant.ts';

@Injectable()
export class TodoService {
  constructor(@Inject(USER_REPOSITORY) private repository: Repository<Todo>) {
  }

  getAll() {
    return this.repository.getAll();
  }

  getById(id: string) {
    return this.repository.getById(id);
  }

  async create(todo: Omit<Todo, '_id'>) {
    return this.repository.create(todo);
  }

  update(todoId: string, todo: Todo) {
    return this.repository.updateOne(todoId, todo);
  }

  async deleteOneById(todoId: string) {
    await this.repository.deleteOne(todoId);
  }

  deleteAll() {
    return this.repository.deleteAll();
  }
}
