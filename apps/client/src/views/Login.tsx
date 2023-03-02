import { createStyles, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { ClientRoutes } from "shared";

import { LoginForm } from "@/components/forms/LoginForm";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export function LoginView() {
  const { classes } = styles();

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

      <LoginForm />
    </AuthLayout>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.teal[6],
    textDecoration: "none",
  },
}));
