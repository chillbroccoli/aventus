import { Flex, MultiSelect, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";

import { QUERY_KEYS } from "@/utils/constants";
import { TagService } from "@/utils/services/TagService";

export function TagSelect() {
  const { control } = useFormContext();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.TAGS],
    queryFn: TagService.findAll,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const options = (data || [])?.map((tag) => ({ value: String(tag.id), label: tag.name }));

  return (
    <Controller
      control={control}
      name="tags"
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <Flex direction="column">
          <MultiSelect
            name={name}
            placeholder="Tags"
            size="xl"
            value={value}
            onChange={onChange}
            data={options}
            searchable
            clearable
            required
          />
          {error && (
            <Text color="red" mt={4} fz="xs">
              {error.message}
            </Text>
          )}
        </Flex>
      )}
    />
  );
}
