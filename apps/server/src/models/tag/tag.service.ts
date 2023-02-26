import { CreateTagInput, UpdateTagInput } from "shared";

import { prisma } from "../../utils/db";

export const TagService = {
  findOne: async (id: string) => {
    return prisma.tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  },

  findAll: async () => {
    return prisma.tag.findMany();
  },

  createOne: async (input: CreateTagInput) => {
    return prisma.tag.create({
      data: input,
    });
  },

  deleteOne: async (id: string) => {
    await prisma.tag.delete({
      where: {
        id: parseInt(id),
      },
    });
  },

  updateOne: async (input: UpdateTagInput) => {
    const { id, ...rest } = input;

    return prisma.tag.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  },
};
