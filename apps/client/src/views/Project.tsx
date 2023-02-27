import { Container, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { InfoPanel } from "@/components/project/InfoPanel";
import { Project } from "@/components/project/Project";
import { Stats } from "@/components/project/Stats";
import { MainLayout } from "@/layouts/MainLayout";
import { QUERY_KEYS } from "@/utils/constants";
import { ProjectService } from "@/utils/services/ProjectService";
import { ParamsWithSlug } from "@/utils/types";

export function ProjectView() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PROJECT, slug],
    queryFn: () => ProjectService.findOne(slug),
    enabled: router.isReady,
    refetchOnWindowFocus: false,
  });

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Grid gutter={10}>
          <Grid.Col span={1}>
            <Stats />
          </Grid.Col>
          <Grid.Col span={9}>
            <Project project={data} />
          </Grid.Col>
          <Grid.Col span={2}>
            <InfoPanel project={data} />
          </Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
