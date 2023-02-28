import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconFolderPlus, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { ClientRoutes } from "shared";

export function EmptyState() {
  const theme = useMantineTheme();

  return (
    <Flex direction="column" align="center">
      <IconFolderPlus size={48} color={theme.colors.gray[5]} stroke={1} />
      <Text fz="lg" fw={600} my={4}>
        No projects found
      </Text>
      <Text my={4}>Get started by creating one</Text>
      <Button
        component={Link}
        href={ClientRoutes.NEW_PROJECT}
        mt={10}
        leftIcon={<IconPlus size={20} />}
      >
        New Project
      </Button>
    </Flex>
  );
}
