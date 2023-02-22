import { useEffect, useState } from "react";
import { JwtPayloadUser } from "shared";

import { RequestError } from "@/utils/services/APIService";
import { UserService } from "@/utils/services/UserService";

export function useMe() {
  const [me, setMe] = useState<JwtPayloadUser | null>(null);

  const fetchMe = async () => {
    try {
      const data = await UserService.me();
      setMe(data);
    } catch (e) {
      if (e instanceof RequestError) setMe(null);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return { me };
}
