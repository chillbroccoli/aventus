import {
  Badge,
  Box,
  createStyles,
  Flex,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { ProjectResponse, UserResponse } from "shared";

import { Comments } from "@/components/comment/Comments";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

import { SettingsMenu } from "./SettingsMenu";

export function Project({ project }: { project?: ProjectResponse }) {
  const { classes } = styles();

  const me = queryClient.getQueryData<UserResponse>([QUERY_KEYS.USER_DETAILS]);

  if (!project) return null;

  const { title, description, content, tags, user } = project;

  return (
    <Box px={40} p={10} className={classes.main}>
      {user.id === me?.id && <SettingsMenu />}

      <Flex direction="column" mt={14}>
        <Box>
          <Title order={1} fw={600}>
            {title}
          </Title>
        </Box>

        <Flex mt={10} gap={10}>
          {tags.map((tag) => (
            <Badge key={tag.id} variant="outline" radius="md">
              # {tag.name}
            </Badge>
          ))}
        </Flex>

        <Box my={12}>
          <Text color="gray.7" fw={300}>
            {description}
          </Text>
        </Box>

        <Box>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </TypographyStylesProvider>
        </Box>
      </Flex>

      <Comments />
    </Box>
  );
}

const styles = createStyles((theme) => ({
  avatar: {
    textTransform: "uppercase",
    border: `1px solid ${theme.colors.teal[5]}`,
  },

  main: {
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.white,
    position: "relative",
  },
}));
