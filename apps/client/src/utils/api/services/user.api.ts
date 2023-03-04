import { MutateOptions, useMutation, useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  APIRoutes,
  CreateUserInput,
  LoginResponse,
  LoginUserInput,
  UpdateUserProfileInput,
  UserResponse,
} from "shared";

import { QUERY_KEYS } from "@/utils/constants";

import { Fetcher, RequestError } from "../Fetcher";

export const user = {
  useUserDetails: (options?: UseQueryOptions<UserResponse, RequestError>) => {
    return useQuery<UserResponse, RequestError>(
      [QUERY_KEYS.USER_DETAILS],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.DETAILS);

        return json as UserResponse;
      },
      options
    );
  },

  useUpdateUserDetails: (
    options?: MutateOptions<UserResponse, RequestError, UpdateUserProfileInput>
  ) => {
    return useMutation(async (body: UpdateUserProfileInput) => {
      const { json } = await Fetcher.patch(APIRoutes.USERS, {
        body,
      });

      return json as UserResponse;
    }, options);
  },

  useDeleteUserAccount: (options?: MutateOptions<void, RequestError, void>) => {
    return useMutation(async () => {
      await Fetcher.delete(APIRoutes.USERS);
    }, options);
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
