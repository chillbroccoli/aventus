import { Alert } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

export function NotFoundState() {
  return (
    <Alert
      variant="filled"
      mt={20}
      icon={<IconMoodSad size={20} />}
      title="That's it"
    >
      No more projects to load
    </Alert>
  );
}
