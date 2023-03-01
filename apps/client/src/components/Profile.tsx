import {
  Button,
  createStyles,
  Divider,
  Flex,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClientRoutes, UserResponse } from "shared";

import { Avatar } from "@/components/Avatar";
import { api } from "@/utils/api";
import { profileNav, QUERY_KEYS } from "@/utils/constants";
import { queryClient } from "@/utils/queryClient";

export function Profile() {
  const { classes } = styles();
  const router = useRouter();

  const user = queryClient.getQueryData<UserResponse>([
    QUERY_KEYS.USER_DETAILS,
  ]);

  const { mutate } = api.user.useLogout({
    onSuccess: () => {
      showNotification({
        title: "Success",
        message: "You have been logged out",
      });
      queryClient.invalidateQueries([QUERY_KEYS.USER_DETAILS]);
      router.push(ClientRoutes.HOME);
    },
  });

  if (!user) return null;

  return (
    <Flex>
      <Popover width={225} position="bottom-end" shadow="md">
        <Popover.Target>
          <UnstyledButton>
            <Avatar src={user?.avatar} />
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex direction="column">
            <Flex direction="column">
              <Text transform="capitalize" fw={500} color="gray.8">
                {user?.name}
              </Text>
              <Text fz="xs" fw={300} color="gray.6">
                {user?.email}
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
