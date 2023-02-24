import {
  APIRoutes,
  BookmarkResponse,
  CreateProjectInput,
  LikeResponse,
  ProjectResponse,
  ProjectStatsResponse,
} from "shared";

import { APIService } from "./APIService";

export const ProjectService = {
  findAll: async () => {
    return (await APIService.get(APIRoutes.PROJECTS)) as ProjectResponse[];
  },

  findOne: async (slug: string) => {
    return (await APIService.get([APIRoutes.PROJECT, { slug }])) as ProjectResponse;
  },

  create: async (body: CreateProjectInput) => {
    return (await APIService.post(APIRoutes.PROJECTS, {
      body,
    })) as ProjectResponse;
  },

  getProjectStats: async (slug: string) => {
    return (await APIService.get([APIRoutes.PROJECT_STATS, { slug }])) as ProjectStatsResponse;
  },

  likeProject: async (slug: string) => {
    return (await APIService.post([APIRoutes.LIKE_PROJECT, { slug }], {
      body: {},
    })) as LikeResponse;
  },

  bookmarkProject: async (slug: string) => {
    return (await APIService.post([APIRoutes.BOOKMARK_PROJECT, { slug }], {
      body: {},
    })) as BookmarkResponse;
  },
};
