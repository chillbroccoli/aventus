import { z } from "zod";

export const createTagSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1)
    .max(50),
});

export const updateTagSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1)
    .max(50),
  id: z.number(),
});

export const tagResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
