import { APIRoutes, CommentResponse, CreateCommentInput } from "shared";

import { APIService } from "./APIService";

export const CommentService = {
  findAll: async (slug: string) => {
    return (await APIService.get([APIRoutes.COMMENTS, { slug }])) as CommentResponse[];
  },

  create: async (slug: string, body: CreateCommentInput) => {
    return await APIService.post([APIRoutes.COMMENTS, { slug }], {
      body,
    });
  },

  deleteOne: async (slug: string, id: number) => {
    return await APIService.delete([APIRoutes.COMMENT, { slug, id: String(id) }], {
      body: {},
    });
  },
};
