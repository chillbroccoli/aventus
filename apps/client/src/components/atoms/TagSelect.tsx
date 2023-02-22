import { MultiSelect } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { TagService } from "@/utils/services/TagService";

export function TagSelect() {
  const [value, setValue] = useState<string[]>([]);

  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: TagService.findAll,
  });

  const options = (data || [])?.map((tag) => ({ value: String(tag.id), label: tag.name }));

  return (
    <MultiSelect
      placeholder="Tags"
      size="xl"
      value={value}
      onChange={setValue}
      data={options}
      searchable
      clearable
      required
    />
  );
}
