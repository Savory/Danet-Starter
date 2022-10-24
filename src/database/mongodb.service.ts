import { Injectable } from 'danet/mod.ts';
import { OnAppBootstrap, OnAppClose } from 'danet/src/hook/interfaces.ts';
import { Collection, Database, MongoClient } from 'mongo/mod.ts';

@Injectable()
export class MongodbService implements OnAppBootstrap, OnAppClose {
  constructor() {}

  private client = new MongoClient();
  private db!: Database;
  getCollection<T>(collectionName: string): Collection<T> {
    return this.db.collection(collectionName);
  }

  async onAppBootstrap() {
    const connectionString = `mongodb+srv://${Deno.env.get('DB_USERNAME')}:${
      Deno.env.get('DB_PASSWORD')
    }@${Deno.env.get('DB_HOST')}/${
      Deno.env.get('DB_NAME')
    }?authMechanism=SCRAM-SHA-1`;
    this.db = await this.client.connect(connectionString);
  }

  async onAppClose() {
    await this.client.close();
  }
}
