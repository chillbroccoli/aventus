import { z } from "zod";

import { userResponseSchema } from "./user";

const projectResponseCore = {
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  likes: z.array(
    z.object({ id: z.number(), userId: z.number(), projectId: z.number() })
  ),
  bookmarks: z.array(
    z.object({ id: z.number(), userId: z.number(), projectId: z.number() })
  ),
  user: userResponseSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  _count: z.object({
    comments: z.number(),
    likes: z.number(),
    bookmarks: z.number(),
  }),
};

export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(4, "Title must be at least 4 characters long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(50, "Description must be at least 50 characters long"),
  tags: z.array(z.string()).min(1, "At least 1 tag is required"),
  content: z
    .string({ required_error: "Content is required" })
    .min(200, "Content must be at least 200 characters long"),
});

export const projectResponseSchema = z.object({
  ...projectResponseCore,
});

export const projectsResponseSchema = z.object({
  data: z.array(projectResponseSchema),
  meta: z.object({
    total: z.object({
      _all: z.number(),
    }),
  }),
});

export const projectStatsSchema = z.object({
  likes: z.array(
    z.object({ id: z.number(), userId: z.number(), projectId: z.number() })
  ),
  bookmarks: z.array(
    z.object({ id: z.number(), userId: z.number(), projectId: z.number() })
  ),
  _count: z.object({
    comments: z.number(),
    likes: z.number(),
    bookmarks: z.number(),
  }),
});

export const projectsFeedResponseSchema = z.object({
  projects: z.array(projectResponseSchema),
  nextCursor: z.number().nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
export type ProjectsResponse = z.infer<typeof projectsResponseSchema>;
export type ProjectStatsResponse = z.infer<typeof projectStatsSchema>;
export type ProjectsFeedResponse = z.infer<typeof projectsFeedResponseSchema>;
