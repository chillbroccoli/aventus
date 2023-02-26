import { Global } from "@mantine/core";

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },

        "html, body": {
          height: "100%",
          backgroundColor: theme.colors.gray[0],
        },
      })}
    />
  );
}
