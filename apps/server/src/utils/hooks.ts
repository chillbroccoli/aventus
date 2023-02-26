import { FastifyInstance } from "fastify";

export async function hooks(server: FastifyInstance) {
  server.addHook("onRequest", (request, _reply, next) => {
    request.jwt = server.jwt;
    return next();
  });
}
