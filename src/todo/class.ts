import { IsString, LengthGreater } from 'danet/validation.ts';

export class Todo {
  readonly _id = crypto.randomUUID();
  @IsString()
  public title: string;

  @IsString()
  @LengthGreater(20)
  public content: string;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
