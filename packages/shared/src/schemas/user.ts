import { z } from "zod";

export const userCore = {
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  avatar: z.string().optional(),
};

export const userProfile = {
  ...userCore,
  bio: z.string().optional(),
  location: z.string().optional(),
  websiteUrl: z.string().optional(),
};

export const createUserSchema = z
  .object({
    ...userCore,
    password: z
      .string({ required_error: "Password is required" })
      .regex(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        ),
        {
          message:
            "Password requires at least 8 characters, at least one uppercase letter, one number, one special character",
        }
      ),
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserProfileSchema = z.object({
  ...userProfile,
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

export const userResponseSchema = z.object({
  ...userProfile,
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
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
