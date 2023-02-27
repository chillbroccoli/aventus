import { Button, Container, createStyles, Flex, Grid, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared";

import { MainLayout } from "@/layouts/MainLayout";
import { Feed } from "@/components/project/Feed";

export function TagView() {
  const { classes } = styles();

  const router = useRouter();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={60}>
          <Grid.Col span={3}>
            <Flex direction="column" className={classes.sidebar} p={10} px={14}>
              <Title transform="capitalize" mb={8}>
                {router.query?.tag}
              </Title>
              <Button component={Link} href={ClientRoutes.NEW_PROJECT} color="teal">
                New Project
              </Button>
            </Flex>
          </Grid.Col>
          <Grid.Col span={7}>
            <Feed />
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}

const styles = createStyles((theme) => ({
  sidebar: {
    boxShadow: theme.shadows.lg,
    border: `1px solid ${theme.colors.gray[2]}`,
    backgroundColor: theme.white,
  },
}));
