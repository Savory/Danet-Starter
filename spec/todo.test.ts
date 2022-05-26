import { DanetApplication } from 'https://deno.land/x/danet@v0.6.2/src/app.ts';
import { bootstrap } from '../src/bootstrap.ts';
import {
  afterEach, beforeEach,
  describe,
  it,
} from 'https://deno.land/std@0.140.0/testing/bdd.ts';
import {
  assertExists,
  assertEquals, assertArrayIncludes
} from 'https://deno.land/std@0.140.0/testing/asserts.ts';
import { Todo } from '../src/todo/class.ts';
import { TodoService } from '../src/todo/service.ts';


let app: DanetApplication;
let server;
let todoService: TodoService;
let port: number;
const payload: Omit<Todo, 'id'> = {
  title: 'my todo',
  content: 'content',
};
describe('Todo', async () => {

  beforeEach(async () => {
    app = await bootstrap();
    server = await app.listen(0);
    todoService = app.get<TodoService>(TodoService);
    port = server.port;
  });

  afterEach(async () => {
      await app.close();
      await todoService.deleteAll();
  });

  it('simple todo creation', async () => {
    const res = await fetch(`http://localhost:${port}/todo`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const returnedData: Todo = await res.json();

    assertExists(returnedData.id);
    assertEquals(returnedData.title, payload.title);
    assertEquals(returnedData.content, payload.content);
  })

  it('get all todos', async () => {
    const firstAdded = todoService.create({ title: 'first todo', content: 'first content'});
    const secondAdded = todoService.create({ title: 'second todo', content: 'second content'});

    const res = await fetch(`http://localhost:${port}/todo`, {
      method: 'GET'
    });

    const returnedData: Todo[] = await res.json();
    assertEquals(returnedData.length, 2);
    const plainArray = JSON.parse(JSON.stringify([firstAdded, secondAdded]));
    assertArrayIncludes(returnedData, plainArray)
  })

  it('get one todo by id', async () => {
    const firstAdded = todoService.create({ title: 'first todo', content: 'first content'});

    const res = await fetch(`http://localhost:${port}/todo/${firstAdded.id}`, {
      method: 'GET'
    });
    const returnedTodo: Todo = await res.json();
    const plainObject = JSON.parse(JSON.stringify(firstAdded));

    assertEquals(returnedTodo, plainObject)
  })

  it('update one todo by id', async () => {
    const firstAdded = todoService.create({ title: 'first todo', content: 'first content'});
    const newPayload = { ...firstAdded, title: 'new title' };

    await (await fetch(`http://localhost:${port}/todo/${firstAdded.id}`, {
      method: 'PUT',
      body: JSON.stringify(newPayload)
    })).text();
    const returnedTodo = await (await fetch(`http://localhost:${port}/todo/${firstAdded.id}`, {
      method: 'GET'
    })).json()

    assertEquals(returnedTodo, newPayload)
  })

  it('delete one todo', async () => {
    const firstAdded = todoService.create({ title: 'first todo', content: 'first content'});

    const res = await fetch(`http://localhost:${port}/todo/${firstAdded.id}`, {
      method: 'DELETE'
    });
    await res.text();

    assertEquals(todoService.getById(firstAdded.id), null);
  })

})
