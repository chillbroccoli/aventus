import { Container, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Tags } from "@/components/molecules/Tags";
import { ProjectsFeed } from "@/components/organisms/ProjectsFeed";
import { ProjectService } from "@/utils/services/ProjectService";

export function HomeView() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: ProjectService.findAll,
  });

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Tags />
          </Grid.Col>
          <Grid.Col span={7}>{data && <ProjectsFeed data={data} />}</Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
