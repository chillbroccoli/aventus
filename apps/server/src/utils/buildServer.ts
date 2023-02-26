import { JWT } from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayloadUser } from "shared";

import { addSchemas } from "./buildJsonSchemas";
import { decorators } from "./decorators";
import { hooks } from "./hooks";
import { logger } from "./logger";
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

  server.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = reply.statusCode !== 200 ? reply.statusCode : 500;
    const errorResponse = {
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    };
    reply.code(statusCode);
    reply.send(errorResponse);
    logger.error(errorResponse);
  });

  addSchemas(server);
  registerModules(server);
  decorators(server);
  hooks(server);
  registerRoutes(server);

  return server;
}
