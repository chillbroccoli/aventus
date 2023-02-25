import { JWT } from "@fastify/jwt";
import Fastify from "fastify";
import { JwtPayloadUser } from "shared";

import { addSchemas } from "./buildJsonSchemas";
import { decorators } from "./decorators";
import { hooks } from "./hooks";
import { registerModules } from "./registerModules";
import { registerRoutes } from "./registerRoutes";

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

  server.setErrorHandler(async (error, request, reply) => {
    if (error instanceof Error) {
      reply.code(error.statusCode ?? 500).send({ message: error.message });
    }
  });

  addSchemas(server);
  registerModules(server);
  decorators(server);
  hooks(server);
  registerRoutes(server);

  return server;
}
