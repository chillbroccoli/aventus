import { Box, createStyles, Text } from "@mantine/core";
import Link from "next/link";
import { ClientRoutes } from "shared";

export function Logo() {
  const { classes } = styles();

  return (
    <Box>
      <Link href={ClientRoutes.HOME} className={classes.link}>
        <Text fz="xl" fw={500} variant="gradient" gradient={{ from: "teal", to: "green", deg: 45 }}>
          Aventus
        </Text>
      </Link>
    </Box>
  );
}

const styles = createStyles(() => ({
  link: {
    textDecoration: "none",
  },
}));
