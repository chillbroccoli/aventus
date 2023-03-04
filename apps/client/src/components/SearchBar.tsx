import { Box, TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClientRoutes } from "shared";

export function SearchBar() {
  const theme = useMantineTheme();
  const router = useRouter();

  const [query, setQuery] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${ClientRoutes.SEARCH}?q=${query}`);
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <TextInput
          placeholder="Search..."
          rightSection={<IconSearch size={20} color={theme.colors.gray[5]} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </Box>
  );
}
