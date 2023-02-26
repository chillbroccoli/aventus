import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";

export async function registerModules(server: FastifyInstance) {
  server.register(helmet);

  server.register(jwt, {
    secret: process.env.JWT_SECRET as string,
    cookie: {
      cookieName: process.env.COOKIE_NAME as string,
      signed: false,
    },
  });

  server.register(cors, {
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  });

  server.register(cookie, {
    secret: process.env.COOKIE_SECRET as string,
    hook: "onRequest",
    parseOptions: {},
  });
}
