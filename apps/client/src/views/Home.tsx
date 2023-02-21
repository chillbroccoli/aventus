import { Container, Grid } from "@mantine/core";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Tags } from "@/components/molecules/Tags";

export function HomeView() {
  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Tags />
          </Grid.Col>
          <Grid.Col span={7}>2</Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
