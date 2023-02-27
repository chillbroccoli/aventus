import { Badge, Box, createStyles, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { ClientRoutes, ProjectResponse } from "shared";

import { Avatar } from "@/components/Avatar";
import { Routing } from "@/utils/api/Routing";
import { trimLongText } from "@/utils/helpers/trimLongText";

export function ProjectCard({ project }: { project: ProjectResponse }) {
  const { classes } = styles();

  const { slug, title, description, tags, updatedAt, user } = project;

  return (
    <Box className={classes.main} px={20} py={10}>
      <Flex align="center">
        <Avatar mr={6} size="lg" src={user.avatar} color="teal" alt="Avatar" />

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
          <Link
            href={Routing.getInterpolatedRoute([
              ClientRoutes.PROJECT,
              { slug },
            ])}
            className={classes.link}
          >
            <Title order={3} fw={600}>
              {title}
            </Title>
          </Link>
        </Box>

        <Box my={8}>
          <Text fz="sm" color="gray.7" fw={300}>
            {trimLongText(description)}
          </Text>
        </Box>

        <Flex mt={8} gap={10}>
          {tags.map((tag) => (
            <Badge key={tag.id} variant="outline" size="lg" radius="md">
              # {tag.name}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.gray[7],
    textDecoration: "none",

    "&:hover": {
      color: theme.colors.teal[5],
      transition: "color 0.2s ease-in-out",
      textDecoration: "underline",
    },
  },

  main: {
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.white,
  },
}));
