import { Alert, Container, Grid } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useEffect } from "react";

import { Feed } from "@/components/project/Feed";
import { Tags } from "@/components/tag/Tags";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { MainLayout } from "@/layouts/MainLayout";
import { api } from "@/utils/api";

export function HomeView() {
  const scrollPosition = useScrollPosition();

  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
    api.project.useFeed({
      limit: 10,
    });

  const projects = data?.pages.flatMap((page) => page.projects) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
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
            {!hasNextPage && (
              <Alert
                variant="filled"
                mt={20}
                icon={<IconMoodSad size={20} />}
                title="That's it"
              >
                No more projects to load
              </Alert>
            )}
          </Grid.Col>
          <Grid.Col span={2}>3</Grid.Col>
        </Grid>
      </Container>
    </MainLayout>
  );
}
