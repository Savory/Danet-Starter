import { Controller, Get } from './deps.ts';

@Controller('')
export class AppController {
  constructor() {
  }

  @Get()
  helloWorld() {
    return "Hello World";
  }
}
