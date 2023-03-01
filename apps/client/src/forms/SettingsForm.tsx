import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, createStyles, Flex, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  UpdateUserProfileInput,
  updateUserProfileSchema,
  UserResponse,
} from "shared";

import { AvatarPicker } from "@/components/AvatarPicker";
import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

export function SettingsForm() {
  const { classes } = styles();

  const user = queryClient.getQueryData<UserResponse>([
    QUERY_KEYS.USER_DETAILS,
  ]);

  const { mutateAsync } = api.user.useUpdateUserDetails({
    onSuccess: () => {
      showNotification({
        title: "Success",
        message: "Your profile has been updated",
      });
      queryClient.invalidateQueries([QUERY_KEYS.USER_DETAILS]);
    },
  });

  const methods = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
  });

  useEffect(() => {
    if (user?.name) methods.setValue("name", user.name);
    if (user?.email) methods.setValue("email", user.email);
    if (user?.avatar) methods.setValue("avatar", user.avatar);
    if (user?.bio) methods.setValue("bio", user.bio);
    if (user?.location) methods.setValue("location", user.location);
    if (user?.websiteUrl) methods.setValue("websiteUrl", user.websiteUrl);
  }, [user]);

  const onSubmit = async (data: UpdateUserProfileInput) => {
    await mutateAsync(data);
  };

  return (
    <Flex direction="column">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box px={14} p={10} className={classes.box}>
            <Title order={3}>User</Title>

            <Flex direction="column" gap={10} mt={20}>
              <Box>
                <Input.Text label="Username" name="name" />
              </Box>
              <Box>
                <Input.Text type="email" label="Email" name="email" />
              </Box>
              <Box>
                <Input.Text type="text" name="avatar" label="Avatar (URL)" />
              </Box>
              <AvatarPicker
                changeAvatar={(url: string) => methods.setValue("avatar", url)}
                initialAvatar={methods.getValues("avatar")}
              />
            </Flex>
          </Box>

          <Box my={10} px={14} p={10} className={classes.box}>
            <Title order={3}>Profile</Title>

            <Flex direction="column" gap={10} mt={20}>
              <Box>
                <Input.Text label="Bio" name="bio" />
              </Box>
              <Box>
                <Input.Text label="Location" name="location" />
              </Box>
              <Box>
                <Input.Text label="Website Url" name="websiteUrl" />
              </Box>
            </Flex>
          </Box>

          <Flex justify="flex-end">
            <Button type="submit">Update</Button>
          </Flex>
        </form>
      </FormProvider>
    </Flex>
  );
}

const styles = createStyles((theme) => ({
  box: {
    backgroundColor: theme.white,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
  },
}));
