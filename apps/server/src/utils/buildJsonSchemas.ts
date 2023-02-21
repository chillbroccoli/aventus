import { buildJsonSchemas } from "fastify-zod";
import {
  createTagSchema,
  createUserSchema,
  loginResponseSchema,
  loginUserSchema,
  paramsWithIdSchema,
  tagResponseSchema,
  updateTagSchema,
  userResponseSchema,
} from "shared/schemas";

export const { schemas: paramsSchemas, $ref: $paramsRef } = buildJsonSchemas(
  {
    paramsWithIdSchema,
  },
  {
    $id: "params",
  }
);

export const { schemas: tagSchemas, $ref: $tagRef } = buildJsonSchemas(
  {
    createTagSchema,
    tagResponseSchema,
    updateTagSchema,
  },
  {
    $id: "tag",
  }
);

export const { schemas: userSchemas, $ref: $userRef } = buildJsonSchemas(
  {
    createUserSchema,
    userResponseSchema,
    loginUserSchema,
    loginResponseSchema,
  },
  {
    $id: "user",
  }
);
