import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Box, Button, createStyles, Divider, Flex, Text, Title } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { CreateCommentInput, createCommentSchema } from "shared";

import { useMe } from "@/hooks/useMe";
import { CommentService } from "@/utils/services/CommentService";

import { Avatar } from "../atoms/Avatar";
import { Input } from "../atoms/Input";

export function Comments() {
  const {
    query: { slug },
  } = useRouter();

  const { me } = useMe();

  const { classes } = styles();

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
  });

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => CommentService.findAll(slug as string),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["createComment", slug],
    mutationFn: (input: CreateCommentInput) => CommentService.create(slug as string, input),
    onSuccess: () => {
      methods.reset();
      queryClient.invalidateQueries(["comments", slug]);
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

      <Divider my={20} />

      <Box>
        <Flex direction="column">
          {data &&
            data.map((comment) => (
              <Flex key={comment.id} align="start" justify="start" mt={10}>
                <Box>
                  <Avatar src={comment.user?.avatar} color="teal" alt="Avatar" />
                </Box>
                <Box p={10} ml={15} w="100%" className={classes.comment}>
                  <Flex justify="space-between">
                    <Flex align="end">
                      <Text transform="capitalize" color="gray.8">
                        {comment.user.name}
                      </Text>
                      <Text ml={10} color="gray.6" fz="sm" fw={300}>
                        {dayjs(comment.createdAt).format("MMM DD, YYYY")}
                      </Text>
                    </Flex>
                    {comment.user.id === me?.id && (
                      <ActionIcon>
                        <IconDots size={18} />
                      </ActionIcon>
                    )}
                  </Flex>

                  <Text mt={20} fw={400} color="gray.9">
                    {comment.content}
                  </Text>
                </Box>
              </Flex>
            ))}
        </Flex>
      </Box>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  comment: {
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
  },
}));
