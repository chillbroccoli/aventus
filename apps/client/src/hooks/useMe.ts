import { APIRoutes, JwtPayloadUser } from "shared";

import { RequestError } from "@/utils/api/Fetcher";
import { Fetcher } from "@/utils/api/Fetcher";
import { useMeStore } from "@/utils/stores/useMeStore";

export function useMe() {
  const setMe = useMeStore((state) => state.setMe);

  const fetchMe = async () => {
    try {
      const data = (await Fetcher.get(APIRoutes.ME))
        .json as JwtPayloadUser | null;
      setMe(data);
    } catch (e) {
      if (e instanceof RequestError) setMe(null);
    }
  };

  return { fetchMe };
}
