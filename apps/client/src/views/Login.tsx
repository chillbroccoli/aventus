import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, createStyles, Flex, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, LoginUserInput, loginUserSchema } from "shared";

import { Input } from "@/components/atoms/Input";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useMe } from "@/hooks/useMe";
import { MUTATION_KEYS } from "@/utils/constants";
import { UserService } from "@/utils/services/UserService";

export function LoginView() {
  const { classes } = styles();

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
    <AuthLayout>
      <Flex direction="column" align="center" mb={30}>
        <Title order={1} fw={500} color="gray.8">
          Welcome back
        </Title>
        <Title order={5} fw={300} color="gray.6">
          Don&apos;t have account?{" "}
          <Link href={ClientRoutes.REGISTER} className={classes.link}>
            Register
          </Link>
        </Title>
      </Flex>

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
    </AuthLayout>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.teal[6],
    textDecoration: "none",
  },
}));
