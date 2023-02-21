import { Box, createStyles, ScrollArea, Title } from "@mantine/core";

import { TagList } from "@/components/atoms/TagList";

export function Tags() {
  const { classes } = styles();

  return (
    <ScrollArea className={classes.container}>
      <Box p={10} px={14}>
        <Title mb={8}>Tags</Title>
        <TagList />
      </Box>
    </ScrollArea>
  );
}

const styles = createStyles((theme) => ({
  container: {
    height: 500,
    boxShadow: theme.shadows.lg,
    borderRadius: theme.radius.sm,
  },
}));
