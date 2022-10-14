import { Module, TokenInjector } from "../deps.ts";
// import { MongoDBService } from "./mongoDBService.ts";
import { PostgresService } from "./postgresService.ts";

export const DATABASE = "DATABASE";

@Module({
  imports: [],
  injectables: [new TokenInjector(PostgresService, DATABASE)], // change PostgresService by any service using other database engine if needed.
})
export class DatabaseModule {}
