import { Box } from "@mantine/core";

import { Navbar } from "@/components/Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Navbar />
      <Box pb={100}>{children}</Box>
    </Box>
  );
}
