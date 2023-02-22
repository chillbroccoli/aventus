import {
  Avatar,
  Button,
  createStyles,
  Divider,
  Flex,
  Popover,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClientRoutes } from "shared";

import { useMe } from "@/hooks/useMe";
import { profileNav } from "@/utils/constants";
import { getInitials } from "@/utils/helpers/getInitials";
import { UserService } from "@/utils/services/UserService";

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

  const initials = getInitials(me.firstName, me.lastName);

  return (
    <Flex>
      <Popover width={225} position="bottom-end" shadow="md">
        <Popover.Target>
          <UnstyledButton>
            <Avatar src={me?.avatar} color="teal" alt="Avatar" className={classes.initials}>
              {initials}
            </Avatar>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex direction="column">
            <Flex direction="column">
              <Text transform="capitalize" fw={500} color="gray.8">
                {me.firstName} {me.lastName}
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
  initials: {
    textTransform: "uppercase",
    border: `1px solid ${theme.colors.teal[5]}`,
  },

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
