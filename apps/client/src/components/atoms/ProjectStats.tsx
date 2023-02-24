import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconBookmark, IconHeart, IconHeartFilled, IconMessage2 } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useMe } from "@/hooks/useMe";
import { ProjectService } from "@/utils/services/ProjectService";

export function ProjectStats() {
  const {
    query: { slug },
  } = useRouter();

  const { me } = useMe();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["projectStats", slug],
    queryFn: () => ProjectService.getProjectStats(slug as string),
  });

  const { mutate: like } = useMutation({
    mutationKey: ["likeProject", slug],
    mutationFn: () => ProjectService.likeProject(slug as string),
    onSuccess: () => {
      queryClient.invalidateQueries(["projectStats", slug]);
    },
  });

  const isLiked = data?.likes?.find((like) => like.userId === me?.id);

  return (
    <Flex direction="column" gap={20}>
      <Flex direction="column" align="center" justify="center">
        {isLiked ? (
          <ActionIcon color="red.5" onClick={() => like()}>
            <IconHeartFilled size={26} />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => like()}>
            <IconHeart size={26} />
          </ActionIcon>
        )}

        <Text fz="sm" color="gray.7">
          {data?._count?.likes ?? 0}
        </Text>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <ActionIcon>
          <IconMessage2 size={26} />
        </ActionIcon>
        <Text fz="sm" color="gray.7">
          {data?._count?.comments ?? 0}
        </Text>
      </Flex>
      <Flex direction="column" align="center" justify="center">
        <ActionIcon>
          <IconBookmark size={26} />
        </ActionIcon>
        <Text fz="sm" color="gray.7">
          0
        </Text>
      </Flex>
    </Flex>
  );
}
