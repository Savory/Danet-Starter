import { Client, Injectable, OnAppBootstrap, OnAppClose } from "../deps.ts";

@Injectable()
export class PostgresService implements OnAppBootstrap, OnAppClose {
  constructor() {}

  public client!: Client;

  async onAppBootstrap() {
    this.client = new Client({
      user: Deno.env.get("DB_USERNAME"),
      password: Deno.env.get("DB_PASSWORD"),
      database: Deno.env.get("DB_NAME"),
      hostname: Deno.env.get("DB_HOST"),
    });
    await this.client.connect();
  }

  async onAppClose() {
    await this.client.end();
  }
}
