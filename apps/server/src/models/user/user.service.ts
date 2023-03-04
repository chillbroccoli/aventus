import * as argon2 from "argon2";
import { CreateUserInput, UpdateUserProfileInput } from "shared";

import { prisma } from "../../utils/db";

export const UserService = {
  findAll: async () => {
    return prisma.user.findMany();
  },

  createOne: async (input: CreateUserInput) => {
    const { password, confirmPassword, ...rest } = input;

    const hashedPassword = await argon2.hash(password);

    const user = prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    return user;
  },

  getUserDetails: async (id: number) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        location: true,
        websiteUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  updateUserDetails: async (
    input: UpdateUserProfileInput & { userId: number }
  ) => {
    const { userId, ...rest } = input;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...rest,
      },
    });

    return user;
  },

  deleteOne: async (id: number) => {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  comparePassword: async (password: string, hashedPassword: string) => {
    return argon2.verify(hashedPassword, password);
  },
};
