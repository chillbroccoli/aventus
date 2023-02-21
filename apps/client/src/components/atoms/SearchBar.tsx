import { Box, TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export function SearchBar() {
  const theme = useMantineTheme();

  return (
    <Box>
      <TextInput
        placeholder="Search..."
        rightSection={<IconSearch size={20} color={theme.colors.gray[5]} />}
      />
    </Box>
  );
}
