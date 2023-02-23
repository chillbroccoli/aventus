import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title must be at least 1 character long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description must be at least 1 character long"),
  tags: z.array(z.string()).min(1, "At least 1 tag is required"),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content must be at least 1 character long"),
});

export const projectResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
