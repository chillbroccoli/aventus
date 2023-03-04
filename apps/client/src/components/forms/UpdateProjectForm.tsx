import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import {
  ClientRoutes,
  CreateProjectInput,
  createProjectSchema,
  ProjectResponse,
} from "shared";

import { Input } from "@/components/Input";
import { TagSelect } from "@/components/tag/TagSelect";
import { api } from "@/utils/api";
import { Routing } from "@/utils/api/Routing";
import { ParamsWithSlug } from "@/utils/types";

const TextEditor = dynamic(
  () => import("../TextEditor").then((mod) => mod.TextEditor),
  {
    ssr: false,
  }
);

export function UpdateProjectForm({ data }: { data: ProjectResponse }) {
  const router = useRouter();

  const { slug } = router.query as ParamsWithSlug;

  const { mutateAsync } = api.project.useUpdate(
    { slug },
    {
      onSuccess: (data) => {
        showNotification({
          title: "Project updated",
          message: "Your project has been updated successfully",
        });

        router.push(
          Routing.getInterpolatedRoute([
            ClientRoutes.PROJECT,
            { slug: data.slug },
          ])
        );
      },
    }
  );

  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags.map((tag) => String(tag.id)),
    },
  });

  const onSubmit = async (input: CreateProjectInput) => {
    await mutateAsync(input);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box mb={10}>
          <Input.Text
            name="title"
            placeholder="Project's title"
            size="xl"
            w="100%"
          />
        </Box>
        <Box my={10}>
          <TagSelect />
        </Box>
        <Box my={10}>
          <Input.Textarea
            name="description"
            placeholder="Description"
            size="xl"
            minRows={6}
          />
        </Box>
        <Box>
          <TextEditor name="content" content={data.content} />
        </Box>

        <Flex justify="end" align="center" mt={30}>
          <Button type="submit">Edit Project</Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
