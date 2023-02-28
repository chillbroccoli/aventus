import { ActionIcon, createStyles, Menu } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ClientRoutes, ParamsWithSlug } from "shared";

import { api } from "@/utils/api";

export function SettingsMenu() {
  const { classes } = styles();

  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { mutate: deleteProject } = api.project.useDelete({
    onSuccess: () => {
      showNotification({
        title: "Project deleted",
        message: "Your project has been deleted",
      });
      router.push(ClientRoutes.HOME);
    },
  });

  return (
    <Menu shadow="lg" width={200}>
      <Menu.Target>
        <ActionIcon className={classes.button}>
          <IconSettings />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Project Settings</Menu.Label>
        <Menu.Item icon={<IconEdit size={20} />}>Edit project</Menu.Item>
        <Menu.Item
          icon={<IconTrash size={20} />}
          onClick={() => deleteProject({ slug })}
        >
          Delete project
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

const styles = createStyles((theme) => ({
  popover: {
    border: `1px solid ${theme.colors.gray[4]}`,
  },

  button: {
    position: "absolute",
    top: 10,
    right: 10,
  },
}));
