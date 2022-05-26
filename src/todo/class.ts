export class Todo {
  readonly id = crypto.randomUUID();
  constructor(public title: string, public content: string) {
  }
}
