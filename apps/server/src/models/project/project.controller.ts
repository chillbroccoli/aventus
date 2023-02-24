import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProjectInput } from "shared";
import { CreateCommentInput, ParamsWithIdAndSlug, ParamsWithSlug } from "shared/schemas";

import { logger } from "../../utils/logger";
import { ProjectService } from "./project.service";

export const ProjectController = {
  findAll: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const projects = await ProjectService.findAll();

      return reply.code(200).send(projects);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  findOne: async (request: FastifyRequest<{ Params: ParamsWithSlug }>, reply: FastifyReply) => {
    const { slug } = request.params;

    try {
      const project = await ProjectService.findOne(slug);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  getProjectStats: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const stats = await ProjectService.getProjectStats(slug);

      if (!stats) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(stats);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  createOne: async (request: FastifyRequest<{ Body: CreateProjectInput }>, reply: FastifyReply) => {
    const body = request.body;

    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const project = await ProjectService.createOne({ ...body, userId: user.id });

      return reply.code(201).send(project);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  getUsersProjects: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const projects = await ProjectService.getUsersProjects(user.id);

      return reply.code(200).send(projects);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  getComments: async (request: FastifyRequest<{ Params: ParamsWithSlug }>, reply: FastifyReply) => {
    const { slug } = request.params;

    try {
      const comments = await ProjectService.getComments(slug);

      return reply.code(200).send(comments);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  createComment: async (
    request: FastifyRequest<{ Params: ParamsWithSlug; Body: CreateCommentInput }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;
    const body = request.body;

    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const comment = await ProjectService.createComment({ ...body, userId: user.id, slug });

      return reply.code(201).send(comment);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  deleteComment: async (
    request: FastifyRequest<{ Params: ParamsWithIdAndSlug }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const comment = await ProjectService.findOneComment(id);

      if (!comment) {
        return reply.code(404).send({ message: "Comment not found" });
      }

      if (comment.userId !== user.id) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      await ProjectService.deleteComment(id);

      return reply.code(200).send({ message: "Comment deleted" });
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  likeProject: async (request: FastifyRequest<{ Params: ParamsWithSlug }>, reply: FastifyReply) => {
    const { slug } = request.params;

    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const project = await ProjectService.likeProject(slug, user.id);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },

  bookmarkProject: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const user = request.user;

      if (!user) {
        return reply.code(401).send({ message: "Unauthorized" });
      }

      const project = await ProjectService.bookmarkProject(slug, user.id);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: any) {
      logger.error(err);
      return reply.code(400).send({ message: err.message });
    }
  },
};
