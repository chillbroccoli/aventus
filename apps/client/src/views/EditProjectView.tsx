import { Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { ClientRoutes, UserResponse } from "shared";

import { UpdateProjectForm } from "@/components/forms/UpdateProjectForm";
import { LoaderLayout } from "@/components/layouts/LoaderLayout";
import { MainLayout } from "@/components/layouts/MainLayout";
import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";
import { ParamsWithSlug } from "@/utils/types";

export function EditProjectView() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const user = queryClient.getQueryData<UserResponse>([
    QUERY_KEYS.USER_DETAILS,
  ]);

  const { data, isLoading } = api.project.useOne(
    { slug },
    {
      enabled: router.isReady,
    }
  );

  if (user && data && user.id !== data.user.id) {
    router.push(ClientRoutes.HOME);
    return null;
  }

  if (isLoading) return <LoaderLayout />;

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w="75%">
          {data && <UpdateProjectForm data={data} />}
        </Box>
      </Container>
    </MainLayout>
  );
}
