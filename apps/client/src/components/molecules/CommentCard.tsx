import { ActionIcon, Avatar, Box, Button, createStyles, Flex, Popover, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDots } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CommentResponse } from "shared";

import { useMe } from "@/hooks/useMe";
import { dayjs } from "@/utils/dayjs";
import { CommentService } from "@/utils/services/CommentService";

export function CommentCard({ comment }: { comment: CommentResponse }) {
  const {
    query: { slug },
  } = useRouter();

  const { classes } = styles();

  const { me } = useMe();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteComment", comment.id],
    mutationFn: () => CommentService.deleteOne(slug as string, comment.id),
    onSuccess: () => {
      showNotification({
        title: "Comment deleted",
        message: "Your comment has been deleted",
      });
      queryClient.invalidateQueries(["comments", slug]);
      queryClient.invalidateQueries(["projectStats", slug]);
    },
  });

  return (
    <Flex align="start" justify="start" mt={10}>
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
              {dayjs(comment.createdAt).fromNow()}
            </Text>
          </Flex>
          {comment.user.id === me?.id && (
            <Popover position="bottom" shadow="md">
              <Popover.Target>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Button onClick={() => mutate()} color="red" variant="outline" fullWidth>
                  Delete comment
                </Button>
              </Popover.Dropdown>
            </Popover>
          )}
        </Flex>

        <Text mt={20} fw={400} color="gray.9">
          {comment.content}
        </Text>
      </Box>
    </Flex>
  );
}

const styles = createStyles((theme) => ({
  comment: {
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
  },
}));
