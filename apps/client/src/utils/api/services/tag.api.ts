import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import { APIRoutes, Tag } from "shared";

import { Fetcher, RequestError } from "../Fetcher";

export const tag = {
  useAll: (options?: UseQueryOptions<Tag[], RequestError>) => {
    return useQuery<Tag[], RequestError>(
      [APIRoutes.TAGS],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.TAGS);

        return json as Tag[];
      },
      options
    );
  },
};
