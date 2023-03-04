import { Box, Container } from "@mantine/core";

import { BookmarksNotFound } from "@/components/BookmarksNotFound";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Feed } from "@/components/project/Feed";
import { api } from "@/utils/api";

export function BookmarksView() {
  const { data, isLoading } = api.user.useUserBookmarks();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Box w="50%" mx="auto">
          <Box mt={20}>
            <Feed data={data} isLoading={isLoading} showEmptyState={false} />
            {!data?.length && <BookmarksNotFound />}
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}
