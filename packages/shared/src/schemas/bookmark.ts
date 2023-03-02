import { z } from "zod";

export const bookmarkResponse = z.object({
  id: z.number(),
  userId: z.number(),
  projectId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type BookmarkResponse = z.infer<typeof bookmarkResponse>;
