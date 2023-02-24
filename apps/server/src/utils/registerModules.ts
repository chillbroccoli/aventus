import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";

export async function registerModules(server: FastifyInstance) {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    cookie: {
      cookieName: process.env.COOKIE_NAME as string,
      signed: false,
    },
  });

  server.register(fastifyCors, {
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  });

  server.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET as string,
    hook: "onRequest",
    parseOptions: {},
  });
}
