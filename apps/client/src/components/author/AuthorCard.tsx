import { Avatar, Flex, Text } from "@mantine/core";
import { JwtPayloadUser } from "shared";

export function AuthorCard({ user }: { user: JwtPayloadUser }) {
  return (
    <Flex>
      <Avatar src={user?.avatar} alt={user.name} />

      <Flex direction="column">
        <Text transform="capitalize" fw={500} color="gray.8">
          {user.name}
        </Text>
        <Text fz="xs" fw={300} color="gray.6">
          {user.email}
        </Text>
      </Flex>
    </Flex>
  );
}
