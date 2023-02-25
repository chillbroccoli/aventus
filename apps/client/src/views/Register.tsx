import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, createStyles, Flex, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, CreateUserInput, createUserSchema } from "shared";

import { Input } from "@/components/atoms/Input";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { MUTATION_KEYS } from "@/utils/constants";
import { UserService } from "@/utils/services/UserService";

export function RegisterView() {
  const { classes } = styles();

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: UserService.register,
    onSuccess: () => {
      showNotification({
        title: "Success",
        message: "You have successfully signed up",
        color: "teal",
      });
      router.push(ClientRoutes.LOGIN);
    },
  });

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserInput) => {
    await mutateAsync(data);
  };

  return (
    <AuthLayout>
      <Flex direction="column" align="center">
        <Title order={1} fw={500} color="gray.8">
          Hello to Aventus
        </Title>
        <Title order={5} fw={300} color="gray.6">
          Already have an account?{" "}
          <Link href={ClientRoutes.LOGIN} className={classes.link}>
            Login
          </Link>
        </Title>
      </Flex>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex direction="column" gap={10} mt={10}>
            <Box>
              <Input.Text name="name" label="Username" required />
            </Box>
            <Box>
              <Input.Text type="email" name="email" label="Email" required />
            </Box>
            <Box>
              <Input.Text type="text" name="avatar" label="Avatar (URL)" />
            </Box>
            <Box>
              <Input.Password name="password" label="Password" required />
            </Box>
            <Box>
              <Input.Password name="confirmPassword" label="Confirm password" required />
            </Box>
            <Box mt={14}>
              <Button type="submit" fullWidth>
                Sign up
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
