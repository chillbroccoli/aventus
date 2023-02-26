import { FastifyInstance } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import {
  commentResponse,
  createCommentSchema,
  createProjectSchema,
  createTagSchema,
  createUserSchema,
  loginResponseSchema,
  loginUserSchema,
  paramsWithIdAndSlugSchema,
  paramsWithIdSchema,
  paramsWithSlugSchema,
  projectResponseSchema,
  projectStatsSchema,
  tagResponseSchema,
  updateTagSchema,
  userResponseSchema,
} from "shared";

export const { schemas: paramsSchemas, $ref: $paramsRef } = buildJsonSchemas(
  {
    paramsWithIdSchema,
    paramsWithSlugSchema,
    paramsWithIdAndSlugSchema,
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
    projectResponseSchema,
    projectStatsSchema,
  },
  {
    $id: "project",
  }
);

export const { schemas: commentSchemas, $ref: $commentRef } = buildJsonSchemas(
  {
    createCommentSchema,
    commentResponse,
  },
  {
    $id: "comment",
  }
);

const jsonSchemas = [
  ...paramsSchemas,
  ...userSchemas,
  ...tagSchemas,
  ...projectSchemas,
  ...commentSchemas,
];

export async function addSchemas(server: FastifyInstance) {
  for (const schema of jsonSchemas) {
    server.addSchema(schema);
  }
}
