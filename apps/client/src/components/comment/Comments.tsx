import { Box, Divider, Flex, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { UserResponse } from "shared";

import { CommentBox } from "@/components/comment/CommentBox";
import { NewCommentForm } from "@/forms/NewCommentForm";
import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";
import { ParamsWithSlug } from "@/utils/types";

export function Comments() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const user = queryClient.getQueryData<UserResponse>([
    QUERY_KEYS.USER_DETAILS,
  ]);

  const { data } = api.comment.useAll({ slug });

  return (
    <Box mt={20}>
      {!user && !data?.length ? null : <Title order={4}>Comments</Title>}

      {user && <NewCommentForm />}

      {data && data.length > 0 && <Divider my={20} />}

      <Box>
        <Flex direction="column">
          {data &&
            data.map((comment) => (
              <CommentBox key={comment.id} comment={comment} />
            ))}
        </Flex>
      </Box>
    </Box>
  );
}
