import { configAsync } from 'dotenv/mod.ts';
import { InitDbService } from './init-db.service.ts';
await configAsync({ export: true });
const user = Deno.env.get('DB_USERNAME');
console.log({ user });

const initDb = new InitDbService();
initDb.createTable();
