import {
  Box,
  Button,
  Container,
  createStyles,
  Flex,
  Popover,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { SettingsForm } from "@/forms/SettingsForm";
import { MainLayout } from "@/layouts/MainLayout";

export function SettingsView() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { classes } = styles();

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Box w="50%" mx="auto">
          <Title mb={30}>Settings</Title>

          <SettingsForm />

          <Box mt={30}>
            <Title order={4}>Danger zone</Title>
            <Flex
              mt={6}
              px={14}
              p={10}
              justify="space-between"
              align="center"
              className={classes.dangerBox}
            >
              <Flex direction="column">
                <Text>Delete Account</Text>
                <Text fz="xs">
                  Once you delete your account, there is no going back.
                </Text>
              </Flex>
              <Popover
                opened={isPopoverOpen}
                onChange={setIsPopoverOpen}
                classNames={{ dropdown: classes.popover }}
              >
                <Popover.Target>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => setIsPopoverOpen(true)}
                  >
                    Delete Account
                  </Button>
                </Popover.Target>

                <Popover.Dropdown>
                  <Box p={10}>
                    <Text>Are you sure you want to delete your account?</Text>
                    <Flex mt={10} justify="flex-end">
                      <Button
                        variant="outline"
                        color="gray"
                        mr={10}
                        onClick={() => setIsPopoverOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="outline" color="red">
                        Delete
                      </Button>
                    </Flex>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </Flex>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}

const styles = createStyles((theme) => ({
  dangerBox: {
    backgroundColor: theme.white,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    border: `1px solid ${theme.colors.red[5]}`,
  },

  popover: {
    border: `1px solid ${theme.colors.red[5]}`,
    boxShadow: theme.shadows.sm,
  },
}));
