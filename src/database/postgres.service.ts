import { Injectable } from '@danet/core';
import { OnAppBootstrap, OnAppClose } from '@danet/core/hook';
import { Client } from '@bartlomieju/postgres';

@Injectable()
export class PostgresService implements OnAppBootstrap, OnAppClose {
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
    await this.client.queryObject(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE IF NOT EXISTS todo (
        _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR NOT NULL,
        content TEXT
      );`,
    );
  }

  async onAppClose() {
    await this.client.end();
  }
}
