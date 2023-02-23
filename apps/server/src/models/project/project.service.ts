import { CreateCommentInput, CreateProjectInput } from "shared";
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
      select: {
        id: true,
        slug: true,
        tags: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        title: true,
        description: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return project;
  },

  createOne: async (input: CreateProjectInput & { userId: number }) => {
    const tagsIds = input.tags.map(Number);

    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagsIds,
        },
      },
    });

    const project = await prisma.project.create({
      data: {
        title: input.title,
        slug: slugify(input.title, { lower: true, replacement: "-" }),
        description: input.description,
        content: input.content,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
        user: {
          connect: {
            id: input.userId,
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

  createComment: async (input: CreateCommentInput & { userId: number; slug: string }) => {
    const comment = await prisma.comment.create({
      data: {
        content: input.content,
        user: {
          connect: {
            id: input.userId,
          },
        },
        project: {
          connect: {
            slug: input.slug,
          },
        },
      },
    });

    return comment;
  },

  getComments: async (slug: string) => {
    const comments = await prisma.comment.findMany({
      where: {
        project: {
          slug,
        },
      },
      include: {
        user: true,
      },
    });

    return comments;
  },
};
