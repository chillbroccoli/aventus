import { Button, createStyles, Divider, Flex, Popover, Text, UnstyledButton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared";

import { useMe } from "@/hooks/useMe";
import { profileNav } from "@/utils/constants";
import { UserService } from "@/utils/services/UserService";

import { Avatar } from "../atoms/Avatar";

export function Profile() {
  const { me } = useMe();
  const router = useRouter();
  const { classes } = styles();

  const { mutate } = useMutation({
    mutationFn: UserService.logout,
    onSuccess: () => {
      showNotification({
        title: "Success",
        message: "You have been logged out",
      });
      router.push(ClientRoutes.LOGIN);
    },
  });

  if (!me) return null;

  return (
    <Flex>
      <Popover width={225} position="bottom-end" shadow="md">
        <Popover.Target>
          <UnstyledButton>
            <Avatar src={me?.avatar} />
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex direction="column">
            <Flex direction="column">
              <Text transform="capitalize" fw={500} color="gray.8">
                {me.name}
              </Text>
              <Text fz="xs" fw={300} color="gray.6">
                {me.email}
              </Text>
            </Flex>

            <Divider my="sm" />

            {profileNav.map((item) => (
              <Link key={item.name} href={item.href} className={classes.link}>
                {item.name}
              </Link>
            ))}

            <Divider my="sm" />

            <Button fullWidth onClick={() => mutate()}>
              Log out
            </Button>
          </Flex>
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
}

const styles = createStyles((theme) => ({
  link: {
    color: theme.colors.gray[7],
    textDecoration: "none",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,

    "&:hover": {
      textDecoration: "underline",
      color: theme.colors.teal[9],
      backgroundColor: theme.colors.teal[1],
    },
  },
}));
