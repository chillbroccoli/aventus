import { Box, Button, Flex, Image, Popover } from "@mantine/core";
import { useEffect, useState } from "react";

import { generateRandomAvatar } from "@/utils/helpers/generateRandomAvatar";

export function AvatarPicker({
  changeAvatar,
  initialAvatar,
}: {
  changeAvatar: (url: string) => void;
  initialAvatar?: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    initialAvatar ?? generateRandomAvatar()
  );

  useEffect(() => {
    if (initialAvatar) setAvatarUrl(initialAvatar);
  }, [initialAvatar]);

  return (
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
                changeAvatar(avatarUrl);
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
  );
}
