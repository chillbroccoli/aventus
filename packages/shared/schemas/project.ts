import { z } from "zod";

import { userResponseSchema } from "./user";

export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(4, "Title must be at least 6 characters long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(50, "Description must be at least 50 characters long"),
  tags: z.array(z.string()).min(1, "At least 1 tag is required"),
  content: z
    .string({ required_error: "Content is required" })
    .min(200, "Content must be at least 200 characters long"),
});

export const projectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  likes: z.array(z.object({ id: z.number(), userId: z.number(), projectId: z.number() })),
  bookmarks: z.array(z.object({ id: z.number(), userId: z.number(), projectId: z.number() })),
  user: userResponseSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  _count: z.object({
    comments: z.number(),
  }),
});

export const projectStatsSchema = z.object({
  likes: z.array(z.object({ id: z.number(), userId: z.number(), projectId: z.number() })),
  bookmarks: z.array(z.object({ id: z.number(), userId: z.number(), projectId: z.number() })),
  _count: z.object({
    comments: z.number(),
    likes: z.number(),
    bookmarks: z.number(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
export type ProjectStatsResponse = z.infer<typeof projectStatsSchema>;
