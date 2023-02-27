import { Box, Container } from "@mantine/core";

import { NewProjectForm } from "@/forms/NewProjectForm";
import { MainLayout } from "@/layouts/MainLayout";

export function NewProjectView() {
  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w="75%">
          <NewProjectForm />
        </Box>
      </Container>
    </MainLayout>
  );
}
