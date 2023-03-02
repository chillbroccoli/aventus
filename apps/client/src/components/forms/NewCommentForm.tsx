import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateCommentInput,
  createCommentSchema,
  ParamsWithSlug,
  UserResponse,
} from "shared";

import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

export function NewCommentForm() {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const user = queryClient.getQueryData<UserResponse>([
    QUERY_KEYS.USER_DETAILS,
  ]);

  const methods = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentSchema),
  });

  const { mutateAsync } = api.comment.useCreate(
    { slug },
    {
      onSuccess: () => {
        showNotification({
          title: "Comment created",
          message: "Your comment has been created",
        });
        methods.reset();
        queryClient.invalidateQueries([QUERY_KEYS.COMMENTS, slug]);
        queryClient.invalidateQueries([QUERY_KEYS.PROJECT_STATS, slug]);
      },
    }
  );

  const onSubmit = async (input: CreateCommentInput) => {
    await mutateAsync(input);
  };

  return (
    <Flex align="start" justify="start" mt={10}>
      <Box>
        <Avatar src={user?.avatar} color="teal" alt="Avatar" />
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
  );
}
