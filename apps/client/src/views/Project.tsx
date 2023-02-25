import { Container, Grid } from "@mantine/core";

import { ProjectStats } from "@/components/atoms/ProjectStats";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ProjectContent } from "@/components/organisms/ProjectContent";

export function ProjectView() {
  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Grid gutter={10}>
          <Grid.Col span={1}>
            <ProjectStats />
          </Grid.Col>
          <Grid.Col span={9}>
            <ProjectContent />
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
