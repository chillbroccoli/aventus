import { Container, Grid } from "@mantine/core";
import { useRouter } from "next/router";

import { AuthorCard } from "@/components/author/AuthorCard";
import { Project } from "@/components/project/Project";
import { Stats } from "@/components/project/Stats";
import { Spinner } from "@/components/Spinner";
import { MainLayout } from "@/layouts/MainLayout";
import { api } from "@/utils/api";
import { ParamsWithSlug } from "@/utils/types";

export function ProjectView() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        {data && (
          <Grid gutter={10}>
            <Grid.Col span={1}>
              <Stats />
            </Grid.Col>
            <Grid.Col span={8}>
              <Project project={data} />
            </Grid.Col>
            <Grid.Col span={3}>
              <AuthorCard project={data} />
            </Grid.Col>
          </Grid>
        )}
        {isLoading && <Spinner />}
      </Container>
    </MainLayout>
  );
}
