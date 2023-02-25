import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Flex } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link } from "@mantine/tiptap";
import { useMutation } from "@tanstack/react-query";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { ClientRoutes, CreateProjectInput, createProjectSchema } from "shared";

import { Input } from "@/components/atoms/Input";
import { TagSelect } from "@/components/atoms/TagSelect";
import { MainLayout } from "@/components/layouts/MainLayout";
import { TextEditor } from "@/components/molecules/TextEditor";
import { MUTATION_KEYS, newProjectTextEditorDefaultContent } from "@/utils/constants";
import { ProjectService } from "@/utils/services/ProjectService";
import { RoutingService } from "@/utils/services/RoutingService";

export function NewProjectView() {
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
      content: newProjectTextEditorDefaultContent,
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: newProjectTextEditorDefaultContent,
    onUpdate({ editor }) {
      methods.setValue("content", editor.getHTML());
    },
  });

  const onSubmit = async (input: CreateProjectInput) => {
    await mutateAsync(input);
  };

  return (
    <MainLayout>
      <Container size="lg" mt={20} pb={20}>
        <Box mx="auto" w="75%">
          <Flex direction="column">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box mb={10}>
                  <Input.Text name="title" placeholder="Project's title" size="xl" w="100%" />
                </Box>
                <Box my={10}>
                  <TagSelect />
                </Box>
                <Box my={10}>
                  <Input.Textarea name="description" placeholder="Description" size="xl" />
                </Box>
                <TextEditor editor={editor} />

                <Flex justify="end" align="center" mt={30}>
                  <Button type="submit" disabled={!methods.formState.isValid}>
                    Create New Project
                  </Button>
                </Flex>
              </form>
            </FormProvider>
          </Flex>
        </Box>
      </Container>
    </MainLayout>
  );
}
