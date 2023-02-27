import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, LoginUserInput, loginUserSchema } from "shared";

import { Input } from "@/components/Input";
import { useMe } from "@/hooks/useMe";
import { MUTATION_KEYS } from "@/utils/constants";
import { UserService } from "@/utils/services/UserService";

export function LoginForm() {
  const router = useRouter();

  const { fetchMe } = useMe();

  const { mutateAsync } = useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: UserService.login,
    onSuccess: async () => {
      await fetchMe();
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

  const onSubmit = async (data: LoginUserInput) => {
    await mutateAsync(data);
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
