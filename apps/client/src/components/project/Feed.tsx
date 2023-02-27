import { Box, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { ProjectCard } from "@/components/project/ProjectCard";
import { QUERY_KEYS } from "@/utils/constants";
import { ProjectService } from "@/utils/services/ProjectService";

export function Feed() {
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
