import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { APIRoutes, CommentResponse, CreateCommentInput } from "shared";

import { QUERY_KEYS } from "@/utils/constants";

import { Fetcher, RequestError } from "../Fetcher";

export const comment = {
  useAll: (
    { slug }: { slug: string },
    options?: UseQueryOptions<CommentResponse[], RequestError>
  ) => {
    return useQuery<CommentResponse[], RequestError>(
      [QUERY_KEYS.COMMENTS, slug],
      async () => {
        const { json } = await Fetcher.get([APIRoutes.COMMENTS, { slug }]);

        return json as CommentResponse[];
      },
      options
    );
  },

  useCreate: (
    { slug }: { slug: string },
    options?: MutationOptions<CommentResponse, RequestError, CreateCommentInput>
  ) => {
    return useMutation(async (body: CreateCommentInput) => {
      const { json } = await Fetcher.post([APIRoutes.COMMENTS, { slug }], {
        body,
      });

      return json as CommentResponse;
    }, options);
  },

  useDelete: (
    { slug }: { slug: string },
    options?: MutationOptions<void, RequestError, { id: number }>
  ) => {
    return useMutation(async ({ id }: { id: number }) => {
      await Fetcher.delete([APIRoutes.COMMENT, { slug, id: String(id) }]);
    }, options);
  },
};
