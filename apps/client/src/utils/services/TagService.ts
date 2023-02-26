import { APIRoutes, Tag } from "shared";

import { APIService } from "./APIService";

export const TagService = {
  findAll: async () => {
    return (await APIService.get(APIRoutes.TAGS)) as Tag[];
  },
};
