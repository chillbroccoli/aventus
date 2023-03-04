import { FastifyInstance } from "fastify";

import { $paramsRef, $userRef } from "../../utils/buildJsonSchemas";
import { UserController } from "./user.controller";

export async function userRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      onRequest: [server.checkAdmin],
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
      onRequest: [server.authenticate],
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

  server.patch(
    "/",
    {
      onRequest: [server.authenticate],
    },
    UserController.updateUserDetails
  );

  server.delete(
    "/:id",
    {
      onRequest: [server.checkAdmin],
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

  server.post("/logout", UserController.logout);

  server.get("/details", UserController.getUserDetails);
}
