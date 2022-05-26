import { Module } from 'https://deno.land/x/danet@v0.6.2/src/module/decorator.ts';
import { TodoModule } from './todo/module.ts';

@Module({
  imports: [TodoModule]
})
export class AppModule {}
