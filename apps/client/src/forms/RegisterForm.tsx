import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, CreateUserInput, createUserSchema } from "shared";

import { AvatarPicker } from "@/components/AvatarPicker";
import { Input } from "@/components/Input";
import { api } from "@/utils/api";

export function RegisterForm() {
  const router = useRouter();

  const { mutateAsync } = api.user.useRegister({
    onSuccess: () => {
      showNotification({
        title: "Success",
        message: "You have successfully signed up",
        color: "teal",
      });
      router.push(ClientRoutes.LOGIN);
    },
  });

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (input: CreateUserInput) => {
    await mutateAsync(input);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Flex direction="column" gap={10} mt={10}>
          <Box>
            <Input.Text name="name" label="Username" required />
          </Box>
          <Box>
            <Input.Text type="email" name="email" label="Email" required />
          </Box>
          <Box>
            <Input.Text type="text" name="avatar" label="Avatar (URL)" />
          </Box>
          <AvatarPicker
            changeAvatar={(url: string) => methods.setValue("avatar", url)}
          />
          <Box>
            <Input.Password name="password" label="Password" required />
          </Box>
          <Box>
            <Input.Password
              name="confirmPassword"
              label="Confirm password"
              required
            />
          </Box>
          <Box mt={14}>
            <Button type="submit" fullWidth>
              Sign up
            </Button>
          </Box>
        </Flex>
      </form>
    </FormProvider>
  );
}
