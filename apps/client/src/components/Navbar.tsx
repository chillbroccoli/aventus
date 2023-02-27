import { Box, Button, Container, createStyles, Flex } from "@mantine/core";
import Link from "next/link";
import { ClientRoutes } from "shared";

import { Logo } from "@/components/Logo";
import { Profile } from "@/components/Profile";
import { SearchBar } from "@/components/SearchBar";
import { useMeStore } from "@/utils/stores/useMeStore";

export function Navbar() {
  const { classes } = styles();

  const me = useMeStore((state) => state.me);

  return (
    <Box px={20} py={12} className={classes.navbar}>
      <Container size="lg">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={14}>
            <Logo />
            <SearchBar />
          </Flex>

          <Flex gap={14}>
            {me ? (
              <Profile />
            ) : (
              <>
                <Button color="teal" component={Link} href={ClientRoutes.LOGIN}>
                  Log in
                </Button>
                <Button
                  variant="outline"
                  color="teal"
                  component={Link}
                  href={ClientRoutes.REGISTER}
                >
                  Create account
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.lg,
  },
}));
