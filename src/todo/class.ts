import { IsString, LengthGreater } from '@danet/core/validation';
import type { ObjectId } from '@db/mongo';

export class Todo {
  readonly _id: `${string}-${string}-${string}-${string}-${string}` | ObjectId  = crypto.randomUUID();
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
