import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { Todo } from "../../todo/class.ts";
import { TodoService } from "../../todo/service.ts";
import { application } from "../../bootstrap.ts";

export default function Home(props: PageProps<Todo[]>) {
    const todos = props.data;
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
          {todos.map((todo) => <div>{todo.title}</div>)}
      </div>
    </>
  );
}

export const handler: Handlers<Todo[]> = {
    async GET(_req: any, ctx: unknown) {
        const todoService = await application.get<TodoService>(TodoService);
        const todos = await todoService.getAll();
        return ctx.render(todos);
    },
};
