import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateCommentInput,
  CreateProjectInput,
  ParamsWithIdAndSlug,
  ParamsWithSlug,
  UpdateCommentInput,
} from "shared";

import { ProjectService } from "./project.service";

export const ProjectController = {
  feed: async (
    request: FastifyRequest<{
      Querystring: {
        limit?: string;
        cursor?: string;
        tag?: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const limit = request.query.limit ? parseInt(request.query.limit) : 10;
    const cursor = request.query.cursor;
    const tag = request.query.tag;

    try {
      const projects = await ProjectService.feed({
        limit,
        cursor,
        tag,
      });

      return reply.code(200).send(projects);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  findAll: async (
    request: FastifyRequest<{ Querystring: { tag: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const projects = await ProjectService.findAll(request.query);

      return reply.code(200).send(projects);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  findOne: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const project = await ProjectService.findOne(slug);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: unknown) {
      return reply.send(err);
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
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  createOne: async (
    request: FastifyRequest<{ Body: CreateProjectInput }>,
    reply: FastifyReply
  ) => {
    const body = request.body;

    try {
      const user = request.user;

      const project = await ProjectService.createOne({
        ...body,
        userId: user.id,
      });

      return reply.code(201).send(project);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  deleteOne: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const user = request.user;

      const project = await ProjectService.findOne(slug);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      if (project.user.id !== user.id) {
        return reply.code(403).send({ message: "Unauthorized" });
      }

      await ProjectService.deleteOne(slug);

      return reply.code(204).send();
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  getUsersProjects: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user;

      const projects = await ProjectService.getUsersProjects(user.id);

      return reply.code(200).send(projects);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  getComments: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const comments = await ProjectService.getComments(slug);

      return reply.code(200).send(comments);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  createComment: async (
    request: FastifyRequest<{
      Params: ParamsWithSlug;
      Body: CreateCommentInput;
    }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;
    const body = request.body;

    try {
      const user = request.user;

      const comment = await ProjectService.createComment({
        ...body,
        userId: user.id,
        slug,
      });

      return reply.code(201).send(comment);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  updateComment: async (
    request: FastifyRequest<{
      Params: ParamsWithIdAndSlug;
      Body: UpdateCommentInput;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;
    const body = request.body;

    try {
      const user = request.user;

      const comment = await ProjectService.findOneComment(id);

      if (!comment) {
        return reply.code(404).send({ message: "Comment not found" });
      }

      if (comment.userId !== user.id) {
        return reply.code(403).send({ message: "Unauthorized" });
      }

      const updatedComment = await ProjectService.updateComment({
        ...body,
        id,
      });

      return reply.code(200).send(updatedComment);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  deleteComment: async (
    request: FastifyRequest<{ Params: ParamsWithIdAndSlug }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const user = request.user;

      const comment = await ProjectService.findOneComment(id);

      if (!comment) {
        return reply.code(404).send({ message: "Comment not found" });
      }

      if (comment.userId !== user.id) {
        return reply.code(403).send({ message: "Unauthorized" });
      }

      await ProjectService.deleteComment(id);

      return reply.code(204).send();
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  likeProject: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const user = request.user;

      const project = await ProjectService.likeProject(slug, user.id);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },

  bookmarkProject: async (
    request: FastifyRequest<{ Params: ParamsWithSlug }>,
    reply: FastifyReply
  ) => {
    const { slug } = request.params;

    try {
      const user = request.user;

      const project = await ProjectService.bookmarkProject(slug, user.id);

      if (!project) {
        return reply.code(404).send({ message: "Project not found" });
      }

      return reply.code(200).send(project);
    } catch (err: unknown) {
      return reply.send(err);
    }
  },
};
