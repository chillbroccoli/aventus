import { Box, Container } from "@mantine/core";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Feed } from "@/components/project/Feed";
import { api } from "@/utils/api";

export function MyProjectsView() {
  const { data, isLoading } = api.user.useUserProjects();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Box w="50%" mx="auto">
          <Box mt={20}>
            <Feed data={data} isLoading={isLoading} />
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
