import { createStyles, Flex, Text, UnstyledButton } from "@mantine/core";
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
    <Flex direction="column">
      {data &&
        data.map((tag) => (
          <UnstyledButton
            key={tag.id}
            className={classes.tagButton}
            onClick={() =>
              router.push(
                RoutingService.getInterpolatedRoute([ClientRoutes.TAG, { tag: tag.name }])
              )
            }
          >
            <Flex align="center" p={4} mb={4}>
              <Text># </Text>
              <Text fw={300} color="gray.7" ml={6}>
                {tag.name}
              </Text>
            </Flex>
          </UnstyledButton>
        ))}
    </Flex>
  );
}

const styles = createStyles((theme) => ({
  tagButton: {
    borderRadius: theme.radius.md,
    "&:hover": {
      backgroundColor: theme.colors.teal[5],
      transition: "background-color 0.2s ease-in-out",
    },
  },
}));
