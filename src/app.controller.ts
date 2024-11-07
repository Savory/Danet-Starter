import { Controller, Get } from '@danet/core';

@Controller('')
export class AppController {
  constructor() {
  }

  @Get()
  helloWorld() {
    return 'Hello World';
  }
}
