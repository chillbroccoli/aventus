import { Box, Flex } from "@mantine/core";

import { ProjectCard } from "@/components/project/ProjectCard";
import { api } from "@/utils/api";

export function Feed() {
  const { data } = api.project.useAll();

  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data &&
          data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Flex>
    </Box>
  );
}
