import { Box, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/utils/constants";
import { ProjectService } from "@/utils/services/ProjectService";

import { ProjectCard } from "../molecules/ProjectCard";

export function ProjectsFeed() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: ProjectService.findAll,
  });

  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data && data.map((project) => <ProjectCard key={project.id} project={project} />)}
      </Flex>
    </Box>
  );
}
