import { Box, Button, Container, createStyles, Flex } from "@mantine/core";
import Link from "next/link";
import { ClientRoutes } from "shared/constants";

import { Logo } from "@/components/atoms/Logo";
import { SearchBar } from "@/components/atoms/SearchBar";
import { Profile } from "@/components/molecules/Profile";
import { useMe } from "@/hooks/useMe";

export function Navbar() {
  const { classes } = styles();

  const { me } = useMe();

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
    boxShadow: theme.shadows.lg,
  },
}));
