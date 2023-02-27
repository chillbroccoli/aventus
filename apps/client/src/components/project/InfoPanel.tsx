import { Box, Button, createStyles, Flex, Popover, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClientRoutes, ProjectResponse } from "shared";

import { api } from "@/utils/api";
import { useMeStore } from "@/utils/stores/useMeStore";
import { ParamsWithSlug } from "@/utils/types";

export function InfoPanel({ project }: { project?: ProjectResponse }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { classes } = styles();

  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const me = useMeStore((state) => state.me);

  const { mutate: deleteProject } = api.project.useDelete({
    onSuccess: () => {
      showNotification({
        title: "Project deleted",
        message: "Your project has been deleted",
      });
      router.push(ClientRoutes.HOME);
    },
  });

  if (!project) return null;

  const { user } = project;

  return (
    <Box px={14} p={10} className={classes.main}>
      {user.id === me?.id && (
        <Flex direction="column" gap={10}>
          <Button variant="outline" color="orange" fullWidth>
            Update Project
          </Button>
          <Popover
            position="bottom"
            shadow="sm"
            classNames={{ dropdown: classes.popover }}
            opened={isPopoverOpen}
            onChange={setIsPopoverOpen}
          >
            <Popover.Target>
              <Button
                onClick={() => setIsPopoverOpen(true)}
                variant="outline"
                color="red"
                fullWidth
              >
                Delete Project
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex direction="column" align="center" p={6} gap={10}>
                <Text>Are you sure?</Text>
                <Flex gap={10}>
                  <Button
                    onClick={() => deleteProject({ slug })}
                    color="red"
                    fullWidth
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => setIsPopoverOpen(false)}
                    variant="outline"
                    color="gray"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      )}
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.xs,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
  },

  popover: {
    border: `1px solid ${theme.colors.gray[4]}`,
  },
}));
