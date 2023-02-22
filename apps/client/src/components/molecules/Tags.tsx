import { Box, createStyles, Title } from "@mantine/core";

import { TagList } from "@/components/atoms/TagList";

export function Tags() {
  const { classes } = styles();

  return (
    <Box p={10} px={14} className={classes.main}>
      <Title mb={14}>Tags</Title>
      <TagList />
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    boxShadow: theme.shadows.lg,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
  },
}));
