import { Client } from 'postgres/mod.ts';
export class DbConfig {
  constructor() {}

  public client!: Client;

  async onAppBootstrap() {
    this.client = new Client({
      user: Deno.env.get('DB_USERNAME'),
      password: Deno.env.get('DB_PASSWORD'),
      database: Deno.env.get('DB_NAME'),
      hostname: Deno.env.get('DB_HOST'),
    });
    await this.client.connect();
  }

  async onAppClose() {
    await this.client.end();
  }

  // async createTable() {
  //   await this.onAppBootstrap();
  //   await this.client.queryObject(
  //     `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  //     CREATE TABLE todo (
  //       _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //       title VARCHAR NOT NULL,
  //       content TEXT CHECK (length(content) >= 20)
  //     );`,
  //   );
  //   await this.onAppClose();
  //   console.log('task done');
  // }
}
