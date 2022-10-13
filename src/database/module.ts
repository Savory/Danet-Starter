import { Module, TokenInjector } from "../deps.ts";
import { MongoDBService } from "./mongoDBService.ts";

export const DATABASE = "DATABASE";

@Module({
  imports: [],
  injectables: [new TokenInjector(MongoDBService, DATABASE)], // change MongoDBService by any service using other database engine if needed.
})
export class DatabaseModule {}
