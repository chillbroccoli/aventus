import { Box, Flex } from "@mantine/core";
import { ProjectResponse } from "shared";

import { ProjectCard } from "../molecules/ProjectCard";

export function ProjectsFeed({ data }: { data: ProjectResponse[] }) {
  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Flex>
    </Box>
  );
}
