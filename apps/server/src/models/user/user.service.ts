import * as argon2 from "argon2";
import { CreateUserInput } from "shared/schemas";

import { prisma } from "../../utils/db";

export const UserService = {
  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  },

  findAll: async () => {
    return prisma.user.findMany();
  },

  createOne: async (input: CreateUserInput) => {
    const { password, ...rest } = input;

    const hashedPassword = await argon2.hash(password);

    return prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
  },

  deleteOne: async (id: string) => {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
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
