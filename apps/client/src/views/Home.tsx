import { Container, Grid } from "@mantine/core";
import { useEffect } from "react";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Feed } from "@/components/project/Feed";
import { NotFoundState } from "@/components/project/NotFoundState";
import { Tags } from "@/components/tag/Tags";
import { api } from "@/utils/api";
import { useScrollPosition } from "@/utils/hooks/useScrollPosition";

export function HomeView() {
  const scrollPosition = useScrollPosition();

  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
    api.project.useFeed({
      limit: 5,
    });

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 95 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Grid gutter={10}>
          <Grid.Col span={3}>
            <Tags />
          </Grid.Col>
          <Grid.Col span={7}>
            <Feed data={projects} isLoading={isLoading} />
            {!hasNextPage && <NotFoundState />}
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
