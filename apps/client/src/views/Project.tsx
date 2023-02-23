import { Container, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { ProjectStats } from "@/components/atoms/ProjectStats";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ProjectContent } from "@/components/organisms/ProjectContent";
import { ProjectService } from "@/utils/services/ProjectService";

export function ProjectView() {
  const {
    query: { slug },
  } = useRouter();

  const { data } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => ProjectService.findOne(slug as string),
  });

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Grid gutter={10}>
          <Grid.Col span={1}>
            <ProjectStats />
          </Grid.Col>
          <Grid.Col span={9}>{data && <ProjectContent project={data} />}</Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
