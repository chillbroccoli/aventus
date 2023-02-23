import { FastifyInstance } from "fastify";

import { $paramsRef, $projectRef } from "../../utils/buildJsonSchemas";
import { ProjectController } from "./project.controller";

export async function projectRoutes(server: FastifyInstance) {
  server.get("/", ProjectController.findAll);

  server.get(
    "/:slug",
    {
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
      },
    },
    ProjectController.findOne
  );

  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $projectRef("createProjectSchema"),
      },
    },
    ProjectController.createOne
  );

  server.get(
    "/my-projects",
    { preHandler: [server.authenticate] },
    ProjectController.getUsersProjects
  );
}
