import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import {
  CommentResponse,
  ParamsWithSlug,
  UpdateCommentInput,
  updateCommentSchema,
} from "shared";

import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

import { Input } from "../Input";

type UpdateCommentModalProps = {
  opened: boolean;
  close: () => void;
  open: () => void;
  comment: CommentResponse;
};

export function UpdateCommentModal({
  opened,
  close,
  comment,
}: UpdateCommentModalProps) {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { mutateAsync } = api.comment.useUpdate(
    {
      slug,
      id: comment.id,
    },
    {
      onSuccess: () => {
        showNotification({
          title: "Comment updated",
          message: "Your comment has been updated",
        });
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        close();
      },
    }
  );

  const methods = useForm<UpdateCommentInput>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      content: comment.content ?? "",
    },
  });

  const onSubmit = async (data: UpdateCommentInput) => {
    await mutateAsync(data);
  };

  return (
    <Modal centered opened={opened} onClose={close} title="Update comment">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input.Textarea name="content" />

          <Flex justify="flex-end" mt={20} gap={10}>
            <Button variant="outline" color="gray" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="outline" color="orange">
              Update
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Modal>
  );
}
