import { z } from "zod";

export const paramsWithIdSchema = z.object({
  id: z.string(),
});

export const paramsWithSlugSchema = z.object({
  slug: z.string(),
});

export const paramsWithIdAndSlugSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export type ParamsWithId = z.infer<typeof paramsWithIdSchema>;
export type ParamsWithSlug = z.infer<typeof paramsWithSlugSchema>;
export type ParamsWithIdAndSlug = z.infer<typeof paramsWithIdAndSlugSchema>;
