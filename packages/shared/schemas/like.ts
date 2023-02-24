import { z } from "zod";

export const likeResponse = z.object({
  id: z.number(),
  userId: z.number(),
  projectId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type LikeResponse = z.infer<typeof likeResponse>;
