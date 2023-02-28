import { ActionIcon, Flex, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkOff,
  IconHeart,
  IconHeartFilled,
  IconMessage2,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { useMeStore } from "@/utils/stores/useMeStore";
import { ParamsWithSlug } from "@/utils/types";

export function Stats() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const me = useMeStore((state) => state.me);

  const queryClient = useQueryClient();

  const { data } = api.project.useProjectStats(
    { slug },
    {
      enabled: router.isReady,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: like } = api.project.useLike({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
    },
  });

  const { mutate: bookmark } = api.project.useBookmark({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
    },
  });

  const isLiked = data?.likes?.find((like) => like.userId === me?.id);
  const isBookmarked = data?.bookmarks?.find(
    (bookmark) => bookmark.userId === me?.id
  );

  return (
    <Flex direction="column" gap={20}>
      <Flex direction="column" align="center" justify="center">
        {isLiked ? (
          <ActionIcon color="red.5" onClick={() => like({ slug })}>
            <IconHeartFilled size={26} />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => like({ slug })}>
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
        {isBookmarked ? (
          <ActionIcon onClick={() => bookmark({ slug })} color="indigo.5">
            <IconBookmarkOff size={26} />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => bookmark({ slug })}>
            <IconBookmark size={26} />
          </ActionIcon>
        )}
        <Text fz="sm" color="gray.7">
          {data?._count?.bookmarks ?? 0}
        </Text>
      </Flex>
    </Flex>
  );
}