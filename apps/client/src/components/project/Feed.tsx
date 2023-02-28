import { Box, Flex } from "@mantine/core";
import { ProjectResponse } from "shared";

import { EmptyState } from "@/components/project/EmptyState";
import { ProjectCard } from "@/components/project/ProjectCard";

export function Feed({ data }: { data?: ProjectResponse[] }) {
  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data &&
          data.length > 0 &&
          data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Flex>
      {!data?.length && <EmptyState />}
    </Box>
  );
}
