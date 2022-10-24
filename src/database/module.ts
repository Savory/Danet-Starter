import { Module, TokenInjector } from "../deps.ts";
import { MongodbService } from './mongodb.service.ts';

export const DATABASE = "DATABASE";

@Module({
  imports: [],
  injectables: [new TokenInjector(MongodbService, DATABASE)], // change PostgresService by any service using other database engine if needed.
})
export class DatabaseModule {}
