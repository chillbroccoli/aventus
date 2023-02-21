import { APIRoutes } from "shared/constants";
import { Tag } from "shared/types";

import { APIService } from "./APIService";

export const TagService = {
  findAll: async () => {
    return (await APIService.get(APIRoutes.TAGS)) as Tag[];
  },
};
