import { DbConfig } from './db-config.ts';

export class InitDbService extends DbConfig {
  constructor() {
    super();
  }

  async createTable() {
    await this.onAppBootstrap();
    await this.client.queryObject(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS todo (
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR NOT NULL,
        content TEXT
      );`,
    );
    await this.onAppClose();
    console.log('task done');
  }
}
