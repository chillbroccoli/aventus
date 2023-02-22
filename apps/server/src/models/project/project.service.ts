import { CreateProjectInput } from "shared";

import { prisma } from "../../utils/db";

export const ProjectService = {
  findAll: async () => {
    const projects = await prisma.project.findMany({
      include: {
        tags: true,
        user: true,
      },
    });

    return projects;
  },

  createOne: async (body: CreateProjectInput & { userId: number }) => {
    const tagsIds = body.tags.map(Number);

    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagsIds,
        },
      },
    });

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
      include: {
        tags: true,
      },
    });

    return project;
  },

  getUsersProjects: async (userId: number) => {
    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
      include: {
        tags: true,
      },
    });

    return projects;
  },
};
