import { Alert } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

export function BookmarksNotFound() {
  return (
    <Alert
      variant="filled"
      mt={20}
      icon={<IconMoodSad size={20} />}
      title="Nothing found"
    >
      You haven&apos;t bookmarked anything yet!
    </Alert>
  );
}
