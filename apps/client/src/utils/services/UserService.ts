import { APIRoutes, CreateUserInput, JwtPayloadUser, LoginResponse, LoginUserInput } from "shared";

import { APIService } from "./APIService";

export const UserService = {
  me: async () => {
    return (await APIService.get(APIRoutes.ME)) as JwtPayloadUser | null;
  },

  register: async (body: CreateUserInput) => {
    return (await APIService.post(APIRoutes.USERS, {
      body,
    })) as { accessToken: string };
  },

  login: async (body: LoginUserInput) => {
    return (await APIService.post(APIRoutes.LOGIN, {
      body,
    })) as LoginResponse;
  },

  logout: async () => {
    return (await APIService.post(APIRoutes.LOGOUT, {
      body: {},
    })) as boolean;
  },
};
