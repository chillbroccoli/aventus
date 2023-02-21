import { Box, createStyles, Flex } from "@mantine/core";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { classes } = styles();

  return (
    <Box w="100vw" h="100vh" bg="gray.1">
      <Flex align="center" justify="center" w="100%" h="100%">
        <Box w={400} p={14} className={classes.main}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  main: {
    border: `1px solid ${theme.colors.gray[4]}`,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
  },
}));
