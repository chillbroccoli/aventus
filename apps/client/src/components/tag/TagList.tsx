import {
  createStyles,
  Flex,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared";

import { api } from "@/utils/api";
import { Routing } from "@/utils/api/Routing";

export function TagList() {
  const { classes } = styles();

  const router = useRouter();

  const { data } = api.tag.useAll();

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
                  Routing.getInterpolatedRoute([
                    ClientRoutes.TAG,
                    { tag: tag.name },
                  ])
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
    height: 505,
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
