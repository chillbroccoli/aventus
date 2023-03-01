import { Box, Container, Title } from "@mantine/core";

import { SettingsForm } from "@/forms/SettingsForm";
import { MainLayout } from "@/layouts/MainLayout";

export function SettingsView() {
  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Box w="50%" mx="auto">
          <Title mb={30}>Settings</Title>

          <SettingsForm />
        </Box>
      </Container>
    </MainLayout>
  );
}
