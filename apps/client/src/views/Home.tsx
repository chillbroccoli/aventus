import { Container, Grid } from "@mantine/core";

import { Feed } from "@/components/project/Feed";
import { Tags } from "@/components/tag/Tags";
import { MainLayout } from "@/layouts/MainLayout";
import { api } from "@/utils/api";

export function HomeView() {
  const { data } = api.project.useAll();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Tags />
          </Grid.Col>
          <Grid.Col span={7}>
            <Feed data={data} />
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
