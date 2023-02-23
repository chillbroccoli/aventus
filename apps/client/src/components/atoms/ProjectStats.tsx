import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconBookmark, IconHeart, IconMessage2 } from "@tabler/icons";

export function ProjectStats() {
  return (
    <Flex direction="column" gap={20}>
      <Flex direction="column" align="center" justify="center">
        <ActionIcon>
          <IconHeart size={26} />
        </ActionIcon>
        <Text fz="sm" color="gray.7">
          0
        </Text>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <ActionIcon>
          <IconMessage2 size={26} />
        </ActionIcon>
        <Text fz="sm" color="gray.7">
          0
        </Text>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <ActionIcon>
          <IconBookmark size={26} />
        </ActionIcon>
        <Text fz="sm" color="gray.7">
          0
        </Text>
      </Flex>
    </Flex>
  );
}
