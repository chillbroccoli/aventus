import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProjectInput } from "shared";
import { JwtPayloadUser } from "shared/schemas";

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

  createOne: async (request: FastifyRequest<{ Body: CreateProjectInput }>, reply: FastifyReply) => {
    const body = request.body;

    try {
      const user = await request.jwtVerify<JwtPayloadUser>();

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
      const user = await request.jwtVerify<JwtPayloadUser>();

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
};
