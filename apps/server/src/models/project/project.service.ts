import { CreateProjectInput } from "shared";
import slugify from "slugify";

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

  findOne: async (slug: string) => {
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        tags: true,
        user: true,
      },
    });

    return project;
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
        slug: slugify(body.title, { lower: true, replacement: "-" }),
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
