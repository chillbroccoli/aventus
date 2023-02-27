import { CreateCommentInput, CreateProjectInput } from "shared";

import { prisma } from "../../utils/db";
import { getSlug } from "../../utils/getSlug";

export const ProjectService = {
  findAll: async () => {
    const projects = await prisma.project.findMany({
      include: {
        tags: true,
        user: true,
        likes: true,
        bookmarks: true,
      },
      orderBy: {
        createdAt: "desc",
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
        likes: true,
        bookmarks: true,
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

  getProjectStats: async (slug: string) => {
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      select: {
        likes: true,
        bookmarks: true,
        _count: {
          select: {
            comments: true,
            likes: true,
            bookmarks: true,
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
        slug: getSlug(input.title),
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
        likes: true,
        bookmarks: true,
      },
    });

    return project;
  },

  deleteOne: async (slug: string) => {
    const project = await prisma.project.delete({
      where: {
        slug,
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
        likes: true,
        bookmarks: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  },

  findOneComment: async (id: string) => {
    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });

    return comment;
  },

  createComment: async (
    input: CreateCommentInput & { userId: number; slug: string }
  ) => {
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

  deleteComment: async (id: string) => {
    const comment = await prisma.comment.delete({
      where: {
        id: Number(id),
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  },

  likeProject: async (slug: string, userId: number) => {
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        likes: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const isLiked = project.likes.find((like) => like.userId === userId);

    if (isLiked) {
      const like = await prisma.like.delete({
        where: {
          id: isLiked.id,
        },
      });

      return like;
    } else {
      const like = await prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          project: {
            connect: {
              slug,
            },
          },
        },
      });

      return like;
    }
  },

  bookmarkProject: async (slug: string, userId: number) => {
    const project = await prisma.project.findUnique({
      where: {
        slug,
      },
      include: {
        bookmarks: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const isBookmarked = project.bookmarks.find(
      (bookmark) => bookmark.userId === userId
    );

    if (isBookmarked) {
      const bookmark = await prisma.bookmark.delete({
        where: {
          id: isBookmarked.id,
        },
      });

      return bookmark;
    } else {
      const bookmark = await prisma.bookmark.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          project: {
            connect: {
              slug,
            },
          },
        },
      });

      return bookmark;
    }
  },
};
