import { z } from "zod";

export const userCore = {
  firstName: z.string({ required_error: "First name is required" }).min(2),
  lastName: z.string({ required_error: "Last name is required" }).min(2),
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  avatar: z.string().optional(),
};

export const createUserSchema = z
  .object({
    ...userCore,
    password: z.string({ required_error: "Password is required" }).min(8),
    confirmPassword: z.string({ required_error: "Confirm password is required" }).min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

export const userResponseSchema = z.object({
  ...userCore,
  id: z.number(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export const jwtPayloadUserSchema = z.object({
  ...userCore,
  id: z.number(),
  role: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type JwtPayloadUser = z.infer<typeof jwtPayloadUserSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
