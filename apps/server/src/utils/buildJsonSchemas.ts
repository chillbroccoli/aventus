import { buildJsonSchemas } from "fastify-zod";
import {
  createProjectSchema,
  createTagSchema,
  createUserSchema,
  loginResponseSchema,
  loginUserSchema,
  paramsWithIdSchema,
  paramsWithSlugSchema,
  tagResponseSchema,
  updateTagSchema,
  userResponseSchema,
} from "shared/schemas";

export const { schemas: paramsSchemas, $ref: $paramsRef } = buildJsonSchemas(
  {
    paramsWithIdSchema,
    paramsWithSlugSchema,
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

export const { schemas: projectSchemas, $ref: $projectRef } = buildJsonSchemas(
  {
    createProjectSchema,
  },
  {
    $id: "project",
  }
);
