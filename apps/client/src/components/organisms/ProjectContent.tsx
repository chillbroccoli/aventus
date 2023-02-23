import {
  Badge,
  Box,
  createStyles,
  Flex,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import dayjs from "dayjs";
import { ProjectResponse } from "shared";

import { Avatar } from "../atoms/Avatar";
import { Comments } from "./Comments";

export function ProjectContent({ project }: { project: ProjectResponse }) {
  const { classes } = styles();

  const { title, description, content, tags, user, updatedAt } = project;

  return (
    <Box px={40} p={10} className={classes.main}>
      <Flex>
        <Box>
          <Avatar
            mr={6}
            size="lg"
            src={user?.avatar}
            color="teal"
            alt="Avatar"
            className={classes.avatar}
          />
        </Box>
        <Flex direction="column">
          <Text transform="capitalize" fw={500} color="gray.8">
            {user.name}
          </Text>
          <Text fz="xs" fw={300} color="gray.6">
            {dayjs(updatedAt).format("MMM DD, YYYY")}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" mt={14}>
        <Box>
          <Title order={3} fw={600}>
            {title}
          </Title>
        </Box>

        <Flex mt={8} gap={10}>
          {tags.map((tag) => (
            <Badge key={tag.id} variant="outline" size="sm" radius="md">
              # {tag.name}
            </Badge>
          ))}
        </Flex>

        <Box my={12}>
          <Text color="gray.7" fw={300}>
            {description}
          </Text>
        </Box>

        <Box mt={20}>
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
  },
}));
