import { Box } from "@mantine/core";

import { Tabs } from "@/components/atoms/Tabs";
import { tabsOptions } from "@/utils/constants";

export function ProjectsFeed() {
  return (
    <Box>
      <Tabs options={tabsOptions} />
    </Box>
  );
}
