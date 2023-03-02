import {
  MutationOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
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
  ProjectsFeedResponse,
  ProjectsResponse,
  ProjectStatsResponse,
} from "shared";

import { QUERY_KEYS } from "@/utils/constants";

import { Fetcher, RequestError } from "../Fetcher";

export const project = {
  useFeed: (
    query?: { limit?: number; cursor?: number; tag?: string },
    options?: UseInfiniteQueryOptions<ProjectsFeedResponse, RequestError>
  ) => {
    return useInfiniteQuery<ProjectsFeedResponse, RequestError>(
      [QUERY_KEYS.FEED],
      async ({ pageParam }) => {
        const { json } = await Fetcher.get(APIRoutes.FEED, {
          query: {
            ...query,
            cursor: query?.cursor || pageParam,
          },
        });

        return json as ProjectsFeedResponse;
      },
      {
        ...options,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  },

  useAll: (
    query?: { tag: string },
    options?: UseQueryOptions<ProjectsResponse, RequestError>
  ) => {
    return useQuery<ProjectsResponse, RequestError>(
      [QUERY_KEYS.PROJECTS],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.PROJECTS, {
          query,
        });

        return json as ProjectsResponse;
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
      await Fetcher.delete([APIRoutes.PROJECT, { slug }]);
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
      const { json } = await Fetcher.post([APIRoutes.LIKE_PROJECT, { slug }]);

      return json as LikeResponse;
    }, options);
  },

  useBookmark: (
    options?: MutationOptions<BookmarkResponse, RequestError, { slug: string }>
  ) => {
    return useMutation(async ({ slug }: { slug: string }) => {
      const { json } = await Fetcher.post([
        APIRoutes.BOOKMARK_PROJECT,
        { slug },
      ]);

      return json as BookmarkResponse;
    }, options);
  },
};
