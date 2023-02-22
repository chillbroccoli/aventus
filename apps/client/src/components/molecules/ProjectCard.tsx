import { Avatar, Badge, Box, createStyles, Flex, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { ClientRoutes, ProjectResponse } from "shared";

import { getInitials } from "@/utils/helpers/getInitials";
import { trimLongText } from "@/utils/helpers/trimLongText";
import { RoutingService } from "@/utils/services/RoutingService";

export function ProjectCard({ project }: { project: ProjectResponse }) {
  const { classes } = styles();

  const { id, title, description, tags, updatedAt, user } = project;

  const initials = getInitials(user.firstName, user.lastName);

  return (
    <Box className={classes.main} px={20} py={10}>
      <Flex align="center">
        <Avatar
          mr={6}
          size="lg"
          src={user.avatar}
          color="teal"
          alt="Avatar"
          className={classes.initials}
        >
          {initials}
        </Avatar>

        <Flex direction="column">
          <Text transform="capitalize" fw={500} color="gray.8">
            {user.firstName} {user.lastName}
          </Text>
          <Text fz="xs" fw={300} color="gray.6">
            {dayjs(updatedAt).format("MMM DD, YYYY")}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" mt={14}>
        <Box>
          <Link
            href={RoutingService.getInterpolatedRoute([ClientRoutes.PROJECT, { id: String(id) }])}
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
  initials: {
    textTransform: "uppercase",
    border: `1px solid ${theme.colors.teal[5]}`,
  },

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
  },
}));
