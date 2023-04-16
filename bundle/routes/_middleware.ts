import { MiddlewareHandlerContext } from "$fresh/server.ts";

export const handler = [
    timing,
    logging,
];

async function timing(
    _req: Request,
    ctx: MiddlewareHandlerContext,
): Promise<Response> {
    const start = performance.now();
    const res = await ctx.next();
    const end = performance.now();
    const dur = (end - start).toFixed(1);
    res.headers.set("Server-Timing", `handler;dur=${dur}`);
    return res;
}

async function logging(
    req: Request,
    ctx: MiddlewareHandlerContext,
): Promise<Response> {
    const res = await ctx.next();
    console.log(`${req.method} ${req.url} ${res.status}`);
    return res;
}