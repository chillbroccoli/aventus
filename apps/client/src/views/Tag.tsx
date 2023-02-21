import { Button, Container, createStyles, Flex, Grid, Title } from "@mantine/core";
import { useRouter } from "next/router";

import { MainLayout } from "@/components/layouts/MainLayout";

export function TagView() {
  const { classes } = styles();

  const router = useRouter();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Flex direction="column" className={classes.sidebar} p={10} px={14}>
              <Title transform="capitalize" mb={8}>
                {router.query?.tag}
              </Title>
              <Button color="teal">Create project</Button>
            </Flex>
          </Grid.Col>
          <Grid.Col span={7}>2</Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}

const styles = createStyles((theme) => ({
  sidebar: {
    boxShadow: theme.shadows.lg,
  },
}));
