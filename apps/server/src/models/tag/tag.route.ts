import { FastifyInstance } from "fastify";

import { $paramsRef, $tagRef } from "../../utils/buildJsonSchemas";
import { TagController } from "./tag.controller";

export async function tagRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: $tagRef("tagResponseSchema"),
          },
        },
      },
    },
    TagController.findAll
  );

  server.post(
    "/",
    {
      schema: {
        body: $tagRef("createTagSchema"),
        response: {
          201: $tagRef("tagResponseSchema"),
        },
      },
    },
    TagController.createOne
  );

  server.delete(
    "/:id",
    {
      schema: {
        params: $paramsRef("paramsWithIdSchema"),
        response: {
          204: {
            type: "null",
          },
        },
      },
    },
    TagController.deleteOne
  );

  server.put(
    "/:id",
    {
      schema: {
        params: $paramsRef("paramsWithIdSchema"),
        body: $tagRef("createTagSchema"),
        response: {
          200: $tagRef("tagResponseSchema"),
        },
      },
    },
    TagController.updateOne
  );
}
