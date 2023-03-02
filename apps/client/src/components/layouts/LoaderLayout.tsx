import { Flex, Loader } from "@mantine/core";

export function LoaderLayout() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Loader />
    </Flex>
  );
}
