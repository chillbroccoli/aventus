import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyJwt, { JWT } from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { APIRoutes } from "shared";
import { JwtPayloadUser } from "shared/schemas";

import { projectRoutes } from "../models/project/project.route";
import { tagRoutes } from "../models/tag/tag.route";
import { userRoutes } from "../models/user/user.route";
import { jsonSchemas } from "../utils/buildJsonSchemas";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
    checkAdmin: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: JwtPayloadUser;
  }
}

export function buildServer() {
  const server = Fastify();

  for (const schema of jsonSchemas) {
    server.addSchema(schema);
  }

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

  server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  });

  server.decorate("checkAdmin", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await request.jwtVerify<JwtPayloadUser>();

      if (user.role !== "ADMIN") {
        return reply.code(401).send({ message: "Unauthorized" });
      }
      return user;
    } catch (err) {
      return reply.send(err);
    }
  });

  server.addHook("onRequest", (request, reply, next) => {
    request.jwt = server.jwt;
    return next();
  });

  server.get("/healthcheck", async () => {
    return { status: "ok" };
  });

  server.register(tagRoutes, { prefix: APIRoutes.TAGS });
  server.register(userRoutes, { prefix: APIRoutes.USERS });
  server.register(projectRoutes, { prefix: APIRoutes.PROJECTS });

  return server;
}
