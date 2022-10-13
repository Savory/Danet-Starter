import { IsString, LengthGreater } from "../deps.ts";

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
