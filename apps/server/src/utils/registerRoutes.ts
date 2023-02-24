import { FastifyInstance } from "fastify";
import { APIRoutes } from "shared";

import { projectRoutes } from "../models/project/project.route";
import { tagRoutes } from "../models/tag/tag.route";
import { userRoutes } from "../models/user/user.route";

export async function registerRoutes(server: FastifyInstance) {
  server.get("/healthcheck", async () => {
    return { status: "ok" };
  });

  server.register(tagRoutes, { prefix: APIRoutes.TAGS });
  server.register(userRoutes, { prefix: APIRoutes.USERS });
  server.register(projectRoutes, { prefix: APIRoutes.PROJECTS });
}
