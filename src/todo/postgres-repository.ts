import { Repository } from '../database/repository.ts';
import { Todo } from './class.ts';
import { Inject } from '@danet/core';
import { DATABASE } from '../database/module.ts';
import { PostgresService } from '../database/postgres.service.ts';

export class PostgresRepository implements Repository<Todo> {
  constructor(@Inject(DATABASE) private dbService: PostgresService) {
  }
  async getAll(): Promise<Todo[]> {
    const { rows } = await this.dbService.client.queryObject<
      Todo
    >`SELECT * FROM TODO`;
    return rows;
  }

  async getById(id: string) {
    const { rows } = await this.dbService.client.queryObject<Todo>(
      `SELECT _id, title, content FROM TODO WHERE _id = '${id}'`,
    );
    return rows[0];
  }

  async create(todo: Omit<Todo, '_id'>) {
    const { rows } = await this.dbService.client.queryObject<Todo>(
      `INSERT INTO TODO (title, content) VALUES ('${todo.title}', '${todo.content}') RETURNING _id, title, content;`,
    );
    return rows[0];
  }

  async updateOne(todoId: string, todo: Todo) {
    const { rows } = await this.dbService.client.queryObject<Todo>(
      `UPDATE TODO SET title = '${todo.title}', content = '${todo.content}' WHERE _id = '${todoId}' RETURNING _id, title, content;`,
    );
    return rows[0];
  }

  async deleteOne(todoId: string) {
    return this.dbService.client.queryObject<Todo>(
      `DELETE FROM TODO WHERE _id = '${todoId}';`,
    );
  }

  async deleteAll() {
    return this.dbService.client.queryObject<Todo>(`DELETE FROM TODO`);
  }
}
