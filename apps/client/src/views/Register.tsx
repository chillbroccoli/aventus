import { createStyles, Flex, Title } from "@mantine/core";
import Link from "next/link";
import { ClientRoutes } from "shared";

import { RegisterForm } from "@/components/forms/RegisterForm";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export function RegisterView() {
  const { classes } = styles();

  return (
    <AuthLayout>
      <Flex direction="column" align="center" mb={30}>
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

      <RegisterForm />
    </AuthLayout>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.teal[6],
    textDecoration: "none",
  },
}));
