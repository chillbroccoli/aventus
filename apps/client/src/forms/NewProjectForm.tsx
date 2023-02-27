import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, CreateProjectInput, createProjectSchema } from "shared";

import { Input } from "@/components/Input";
import { TagSelect } from "@/components/tag/TagSelect";
import { MUTATION_KEYS } from "@/utils/constants";
import { ProjectService } from "@/utils/services/ProjectService";
import { RoutingService } from "@/utils/services/RoutingService";

const TextEditor = dynamic(() => import("../components/TextEditor").then((mod) => mod.TextEditor), {
  ssr: false,
});

export function NewProjectForm() {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_PROJECT],
    mutationFn: ProjectService.create,
    onSuccess: (data) => {
      showNotification({
        title: "Project created",
        message: "Your project has been created successfully",
      });

      router.push(RoutingService.getInterpolatedRoute([ClientRoutes.PROJECT, { slug: data.slug }]));
    },
  });

  const methods = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (input: CreateProjectInput) => {
    await mutateAsync(input);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box mb={10}>
          <Input.Text name="title" placeholder="Project's title" size="xl" w="100%" />
        </Box>
        <Box my={10}>
          <TagSelect />
        </Box>
        <Box my={10}>
          <Input.Textarea name="description" placeholder="Description" size="xl" minRows={6} />
        </Box>
        <Box>
          <TextEditor name="content" />
        </Box>

        <Flex justify="end" align="center" mt={30}>
          <Button type="submit">Create New Project</Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
