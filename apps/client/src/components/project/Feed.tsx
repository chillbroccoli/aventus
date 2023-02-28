import { Box, Flex } from "@mantine/core";
import { ProjectResponse } from "shared";

import { EmptyState } from "@/components/project/EmptyState";
import { ProjectCard } from "@/components/project/ProjectCard";

import { Spinner } from "../Spinner";

export function Feed({
  data,
  isLoading,
}: {
  data?: ProjectResponse[];
  isLoading?: boolean;
}) {
  return (
    <Box>
      <Flex direction="column" gap={20}>
        {data &&
          data.length > 0 &&
          data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Flex>
      {isLoading && !data?.length && <Spinner />}
      {!isLoading && !data?.length && <EmptyState />}
    </Box>
  );
}
