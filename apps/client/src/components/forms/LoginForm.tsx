import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, LoginUserInput, loginUserSchema } from "shared";

import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

export function LoginForm() {
  const router = useRouter();

  const { mutateAsync } = api.user.useLogin({
    onSuccess: async () => {
      queryClient.invalidateQueries([QUERY_KEYS.USER_DETAILS]);
      showNotification({
        title: "Success",
        message: "You have successfully logged in",
        color: "teal",
      });
      router.push(ClientRoutes.HOME);
    },
  });

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (input: LoginUserInput) => {
    await mutateAsync(input);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Flex direction="column" gap={10} mt={10}>
          <Box>
            <Input.Text name="email" label="Email" required />
          </Box>
          <Box>
            <Input.Password name="password" label="Password" required />
          </Box>
          <Box mt={14}>
            <Button type="submit" fullWidth>
              Log in
            </Button>
          </Box>
        </Flex>
      </form>
    </FormProvider>
  );
}
