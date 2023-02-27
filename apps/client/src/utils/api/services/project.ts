import {
  MutationOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  APIRoutes,
  BookmarkResponse,
  CreateProjectInput,
  LikeResponse,
  ProjectResponse,
  ProjectStatsResponse,
} from "shared";

import { QUERY_KEYS } from "@/utils/constants";

import { Fetcher, RequestError } from "../Fetcher";

export const project = {
  useAll: (options?: UseQueryOptions<ProjectResponse[], RequestError>) => {
    return useQuery<ProjectResponse[], RequestError>(
      [QUERY_KEYS.PROJECTS],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.PROJECTS);

        return json as ProjectResponse[];
      },
      options
    );
  },

  useOne: (
    { slug }: { slug: string },
    options?: UseQueryOptions<ProjectResponse, RequestError>
  ) => {
    return useQuery<ProjectResponse, RequestError>(
      [QUERY_KEYS.PROJECT, slug],
      async () => {
        const { json } = await Fetcher.get([APIRoutes.PROJECT, { slug }]);

        return json as ProjectResponse;
      },
      options
    );
  },

  useCreate: (
    options?: MutationOptions<ProjectResponse, RequestError, CreateProjectInput>
  ) => {
    return useMutation(async (body: CreateProjectInput) => {
      const { json } = await Fetcher.post(APIRoutes.PROJECTS, {
        body,
      });

      return json as ProjectResponse;
    }, options);
  },

  useDelete: (
    options?: MutationOptions<void, RequestError, { slug: string }>
  ) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      await Fetcher.delete([APIRoutes.PROJECT, { slug }], {
        body: {},
      });
    }, options);
  },

  useProjectStats: (
    { slug }: { slug: string },
    options?: UseQueryOptions<ProjectStatsResponse, RequestError>
  ) => {
    return useQuery<ProjectStatsResponse, RequestError>(
      [QUERY_KEYS.PROJECT_STATS, slug],
      async () => {
        const { json } = await Fetcher.get([APIRoutes.PROJECT_STATS, { slug }]);

        return json as ProjectStatsResponse;
      },
      options
    );
  },

  useLike: (
    options?: MutationOptions<LikeResponse, RequestError, { slug: string }>
  ) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      const { json } = await Fetcher.post([APIRoutes.LIKE_PROJECT, { slug }], {
        body: {},
      });

      return json as LikeResponse;
    }, options);
  },

  useBookmark: (
    options?: MutationOptions<BookmarkResponse, RequestError, { slug: string }>
  ) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      const { json } = await Fetcher.post(
        [APIRoutes.BOOKMARK_PROJECT, { slug }],
        {
          body: {},
        }
      );

      return json as BookmarkResponse;
    }, options);
  },
};
