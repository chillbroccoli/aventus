import { FastifyInstance } from "fastify";

import { $paramsRef, $userRef } from "../../utils/buildJsonSchemas";
import { UserController } from "./user.controller";

export async function userRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      preHandler: [server.authenticateAdmin],
      schema: {
        response: {
          200: {
            type: "array",
            items: $userRef("userResponseSchema"),
          },
        },
      },
    },
    UserController.findAll
  );

  server.post(
    "/",
    {
      schema: {
        body: $userRef("createUserSchema"),
        response: {
          201: $userRef("userResponseSchema"),
        },
      },
    },
    UserController.createOne
  );

  server.delete(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          204: {
            type: "null",
          },
        },
      },
    },
    UserController.deleteUserAccount
  );

  server.delete(
    "/:id",
    {
      preHandler: [server.authenticateAdmin],
      schema: {
        params: $paramsRef("paramsWithIdSchema"),
        response: {
          204: {
            type: "null",
          },
        },
      },
    },
    UserController.deleteOne
  );

  server.post(
    "/login",
    {
      schema: {
        body: $userRef("loginUserSchema"),
        response: {
          200: $userRef("loginResponseSchema"),
        },
      },
    },
    UserController.login
  );

  server.get("/me", UserController.me);
}
