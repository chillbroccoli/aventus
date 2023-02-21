import { APIRoutes, LoginResponse, LoginUserInput } from "shared";

import { APIService } from "./APIService";

export const UserService = {
  me: async () => {
    return await APIService.get(APIRoutes.ME);
  },

  login: async (body: LoginUserInput) => {
    return (await APIService.post(APIRoutes.LOGIN, {
      body,
    })) as LoginResponse;
  },
};
