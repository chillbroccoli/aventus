import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, createStyles, Flex, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, LoginUserInput, loginUserSchema } from "shared";

import { Input } from "@/components/atoms/Input";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { UserService } from "@/utils/services/UserService";

export function LoginView() {
  const { classes } = styles();

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: UserService.login,
    onSuccess: () => {
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
      <Flex direction="column" align="center">
        <Title fw={600}>Welcome back</Title>
        <Text fw={300}>
          Don&apos;t have account?{" "}
          <Link href={ClientRoutes.REGISTER} className={classes.link}>
            Register
          </Link>
        </Text>
      </Flex>

      <Flex direction="column" gap={10} mt={10}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          </form>
        </FormProvider>
      </Flex>
    </AuthLayout>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.teal[6],
    textDecoration: "none",
  },
}));
