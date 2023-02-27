import { MutateOptions, useMutation, useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  APIRoutes,
  CreateUserInput,
  JwtPayloadUser,
  LoginResponse,
  LoginUserInput,
} from "shared";

import { Fetcher, RequestError } from "../Fetcher";

export const user = {
  useMe: (options?: UseQueryOptions<JwtPayloadUser | null, RequestError>) => {
    return useQuery<JwtPayloadUser | null, RequestError>(
      [APIRoutes.ME],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.ME);

        return json as JwtPayloadUser | null;
      },
      options
    );
  },

  useRegister: (
    options?: MutateOptions<
      { accessToken: string },
      RequestError,
      CreateUserInput
    >
  ) => {
    return useMutation(async (body: CreateUserInput) => {
      const { json } = await Fetcher.post(APIRoutes.USERS, {
        body,
      });

      return json as { accessToken: string };
    }, options);
  },

  useLogin: (
    options?: MutateOptions<LoginResponse, RequestError, LoginUserInput>
  ) => {
    return useMutation(async (body: LoginUserInput) => {
      const { json } = await Fetcher.post(APIRoutes.LOGIN, {
        body,
      });

      return json as LoginResponse;
    }, options);
  },

  useLogout: (options?: MutateOptions<boolean, RequestError, void>) => {
    return useMutation(async () => {
      const { json } = await Fetcher.post(APIRoutes.LOGOUT);

      return json as boolean;
    }, options);
  },
};
