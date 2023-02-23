import { APIRoutes, ProjectResponse } from "shared";

import { APIService } from "./APIService";

export const ProjectService = {
  findAll: async () => {
    return (await APIService.get(APIRoutes.PROJECTS)) as ProjectResponse[];
  },

  findOne: async (slug: string) => {
    return (await APIService.get([APIRoutes.PROJECT, { slug }])) as ProjectResponse;
  },
};
