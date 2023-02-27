import { Box, Divider, Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { CommentBox } from "@/components/comment/CommentBox";
import { NewCommentForm } from "@/forms/NewCommentForm";
import { QUERY_KEYS } from "@/utils/constants";
import { CommentService } from "@/utils/services/CommentService";
import { ParamsWithSlug } from "@/utils/types";

export function Comments() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, slug],
    queryFn: () => CommentService.findAll(slug),
    enabled: router.isReady,
    refetchOnWindowFocus: false,
  });

  return (
    <Box mt={20}>
      <Title order={4}>Comments</Title>

      <NewCommentForm />

      {data && data.length > 0 && <Divider my={20} />}

      <Box>
        <Flex direction="column">
          {data && data.map((comment) => <CommentBox key={comment.id} comment={comment} />)}
        </Flex>
      </Box>
    </Box>
  );
}
