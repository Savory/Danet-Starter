import { Repository } from '../database/repository.ts';
import { Todo } from './class.ts';
import { ObjectId } from '@db/mongo';
import { Inject } from '@danet/core';
import { DATABASE } from '../database/module.ts';
import { MongodbService } from '../database/mongodb.service.ts';

export class MongodbRepository implements Repository<Todo> {
  constructor(@Inject(DATABASE) private dbService: MongodbService) {
  }
  async getAll(): Promise<Todo[]> {
    return this.dbService.getCollection<Todo>('Todo').find({}).toArray();
  }

  async getById(id: string) {
    return this.dbService.getCollection<Todo>('Todo').findOne({
      _id: new ObjectId(id),
    });
  }

  async create(todo: Omit<Todo, '_id'>) {
    const insertedId = await this.dbService.getCollection<Omit<Todo, 'id'>>(
      'Todo',
    ).insertOne(todo);
    return {
      _id: insertedId,
      ...todo,
    };
  }

  async updateOne(todoId: string, todo: Todo) {
    const objectId = new ObjectId(todoId);
    const updated = await this.dbService.getCollection<Todo>('Todo').updateOne(
      { _id: objectId },
      { $set: { ...todo } },
    );
    return updated;
  }

  async deleteOne(todoId: string) {
    return this.dbService.getCollection<Todo>('Todo').deleteOne({
      _id: new ObjectId(todoId),
    });
  }

  async deleteAll() {
    return this.dbService.getCollection<Todo>('Todo').deleteMany({});
  }
}
