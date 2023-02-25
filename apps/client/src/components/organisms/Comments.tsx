import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Flex, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { CreateCommentInput, createCommentSchema } from "shared";

import { MUTATION_KEYS, QUERY_KEYS } from "@/utils/constants";
import { CommentService } from "@/utils/services/CommentService";
import { useMeStore } from "@/utils/stores/useMeStore";

import { Avatar } from "../atoms/Avatar";
import { Input } from "../atoms/Input";
import { CommentCard } from "../molecules/CommentCard";

export function Comments() {
  const {
    query: { slug },
    isReady,
  } = useRouter();

  const me = useMeStore((state) => state.me);

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
  });

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, slug],
    queryFn: () => CommentService.findAll(slug as string),
    enabled: isReady,
  });

  const { mutateAsync } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_COMMENT, slug],
    mutationFn: (input: CreateCommentInput) => CommentService.create(slug as string, input),
    onSuccess: () => {
      showNotification({
        title: "Comment created",
        message: "Your comment has been created",
      });
      methods.reset();
      queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
      queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
    },
  });

  const onSubmit = async (input: CreateCommentInput) => {
    await mutateAsync(input);
  };

  return (
    <Box mt={20}>
      <Title order={4}>Comments</Title>

      <Flex align="start" justify="start" mt={10}>
        <Box>
          <Avatar src={me?.avatar} color="teal" alt="Avatar" />
        </Box>
        <Box ml={15} w="100%">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Input.Textarea name="content" w="100%" />

              {methods.formState.isValid && (
                <Flex justify="flex-end" mt={10}>
                  <Button type="submit">Submit</Button>
                </Flex>
              )}
            </form>
          </FormProvider>
        </Box>
      </Flex>

      {data && data.length > 0 && <Divider my={20} />}

      <Box>
        <Flex direction="column">
          {data && data.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
        </Flex>
      </Box>
    </Box>
  );
}
