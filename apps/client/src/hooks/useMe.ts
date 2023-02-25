import { RequestError } from "@/utils/services/APIService";
import { UserService } from "@/utils/services/UserService";
import { useMeStore } from "@/utils/stores/useMeStore";

export function useMe() {
  const setMe = useMeStore((state) => state.setMe);

  const fetchMe = async () => {
    try {
      const data = await UserService.me();
      setMe(data);
    } catch (e) {
      if (e instanceof RequestError) setMe(null);
    }
  };

  return { fetchMe };
}
