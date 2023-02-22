import { createStyles, Flex, ScrollArea, Text, UnstyledButton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared/constants";

import { RoutingService } from "@/utils/services/RoutingService";
import { TagService } from "@/utils/services/TagService";

export function TagList() {
  const { classes } = styles();

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: TagService.findAll,
  });

  return (
    <ScrollArea className={classes.container}>
      <Flex direction="column">
        {data &&
          data.map((tag) => (
            <UnstyledButton
              key={tag.id}
              px={4}
              className={classes.tagButton}
              onClick={() =>
                router.push(
                  RoutingService.getInterpolatedRoute([ClientRoutes.TAG, { tag: tag.name }])
                )
              }
            >
              <Flex align="center" p={4} mb={4}>
                <Text># </Text>
                <Text fw={300} ml={6}>
                  {tag.name}
                </Text>
              </Flex>
            </UnstyledButton>
          ))}
      </Flex>
    </ScrollArea>
  );
}

const styles = createStyles((theme) => ({
  container: {
    height: 500,
  },

  tagButton: {
    borderRadius: theme.radius.md,
    color: theme.colors.gray[7],

    "&:hover": {
      color: theme.colors.teal[9],
      backgroundColor: theme.colors.teal[1],
    },
  },
}));
