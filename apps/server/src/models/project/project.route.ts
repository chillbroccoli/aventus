import { FastifyInstance } from "fastify";

import {
  $commentRef,
  $paramsRef,
  $projectRef,
} from "../../utils/buildJsonSchemas";
import { ProjectController } from "./project.controller";

export async function projectRoutes(server: FastifyInstance) {
  server.get("/", ProjectController.findAll);

  server.get("/feed", ProjectController.feed);

  server.post(
    "/",
    {
      onRequest: [server.authenticate],
      schema: {
        body: $projectRef("createProjectSchema"),
      },
    },
    ProjectController.createOne
  );

  server.delete(
    "/:slug",
    {
      onRequest: [server.authenticate],
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
      },
    },
    ProjectController.deleteOne
  );

  server.get(
    "/:slug",
    {
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
        response: {
          200: $projectRef("projectResponseSchema"),
        },
      },
    },
    ProjectController.findOne
  );

  server.get(
    "/:slug/stats",
    {
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
        response: {
          200: $projectRef("projectStatsSchema"),
        },
      },
    },
    ProjectController.getProjectStats
  );

  server.get(
    "/:slug/comments",
    {
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
        response: {
          200: {
            type: "array",
            items: $commentRef("commentResponse"),
          },
        },
      },
    },
    ProjectController.getComments
  );

  server.post(
    "/:slug/comments",
    {
      onRequest: [server.authenticate],
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
        body: $commentRef("createCommentSchema"),
      },
    },
    ProjectController.createComment
  );

  server.post(
    "/:slug/like",
    {
      onRequest: [server.authenticate],
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
      },
    },
    ProjectController.likeProject
  );

  server.post(
    "/:slug/bookmark",
    {
      onRequest: [server.authenticate],
      schema: {
        params: $paramsRef("paramsWithSlugSchema"),
      },
    },
    ProjectController.bookmarkProject
  );

  server.delete(
    "/:slug/comments/:id",
    {
      onRequest: [server.authenticate],
      schema: {
        params: $paramsRef("paramsWithIdAndSlugSchema"),
      },
    },
    ProjectController.deleteComment
  );

  server.get(
    "/my-projects",
    { onRequest: [server.authenticate] },
    ProjectController.getUsersProjects
  );
}
