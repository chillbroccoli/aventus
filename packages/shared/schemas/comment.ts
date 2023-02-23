import { z } from "zod";

import { userResponseSchema } from "./user";

export const createCommentSchema = z.object({
  content: z.string().min(1).max(500),
});

export const commentResponse = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userResponseSchema,
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CommentResponse = z.infer<typeof commentResponse>;
