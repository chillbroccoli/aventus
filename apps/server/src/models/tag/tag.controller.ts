import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTagInput, ParamsWithId } from "shared/schemas";

import { TagService } from "./tag.service";

export const TagController = {
  findAll: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const tags = await TagService.findAll();

      return reply.code(200).send(tags);
    } catch (err: unknown) {
      reply.send(err);
    }
  },

  createOne: async (request: FastifyRequest<{ Body: CreateTagInput }>, reply: FastifyReply) => {
    const body = request.body;

    try {
      const tag = await TagService.createOne(body);

      return reply.code(201).send(tag);
    } catch (err: unknown) {
      reply.send(err);
    }
  },

  updateOne: async (
    request: FastifyRequest<{
      Params: ParamsWithId;
      Body: CreateTagInput;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    const body = request.body;

    try {
      const tag = await TagService.findOne(id);

      if (!tag) {
        return reply.code(404).send({ message: "Tag not found" });
      }

      const updatedTag = await TagService.updateOne({
        ...body,
        id: parseInt(id),
      });

      return reply.code(200).send(updatedTag);
    } catch (err: unknown) {
      reply.send(err);
    }
  },

  deleteOne: async (
    request: FastifyRequest<{
      Params: ParamsWithId;
    }>,
    reply: FastifyReply
  ) => {
    const { id } = request.params;

    try {
      const tag = await TagService.findOne(id);

      if (!tag) {
        return reply.code(404).send({ message: "Tag not found" });
      }

      await TagService.deleteOne(id);

      return reply.code(204).send();
    } catch (err: unknown) {
      reply.send(err);
    }
  },
};
