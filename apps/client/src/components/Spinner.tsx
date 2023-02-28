import { Flex, Loader } from "@mantine/core";

export function Spinner() {
  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <Loader />
    </Flex>
  );
}
