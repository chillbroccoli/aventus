import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Image, Popover } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, CreateUserInput, createUserSchema } from "shared";

import { Input } from "@/components/Input";
import { api } from "@/utils/api";
import { generateRandomAvatar } from "@/utils/helpers/generateRandomAvatar";

export function RegisterForm() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(generateRandomAvatar());

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
          <Popover
            opened={isPopoverOpen}
            onChange={setIsPopoverOpen}
            position="top"
            width={450}
            shadow="sm"
          >
            <Popover.Target>
              <Box>
                <Button
                  variant="light"
                  fullWidth
                  onClick={() => setIsPopoverOpen(true)}
                >
                  Pick Avatar
                </Button>
              </Box>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex direction="column">
                <Box w="100%" py={10}>
                  <Image src={avatarUrl} alt="Avatar" height={300} />
                </Box>
                <Flex gap={10}>
                  <Button
                    fullWidth
                    onClick={() => {
                      methods.setValue("avatar", avatarUrl);
                      setAvatarUrl(generateRandomAvatar());
                      setIsPopoverOpen(false);
                    }}
                  >
                    Looks great!
                  </Button>
                  <Button
                    variant="outline"
                    color="gray"
                    fullWidth
                    onClick={() => setAvatarUrl(generateRandomAvatar())}
                  >
                    Generate new one
                  </Button>
                </Flex>
              </Flex>
            </Popover.Dropdown>
          </Popover>
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
