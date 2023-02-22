import { Box, Container, Flex, TextInput } from "@mantine/core";
import { Link } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { TagSelect } from "@/components/atoms/TagSelect";
import { MainLayout } from "@/components/layouts/MainLayout";
import { TextEditor } from "@/components/molecules/TextEditor";
import { newProjectTextEditorDefaultContent } from "@/utils/constants";

export function NewProjectView() {
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
  });

  return (
    <MainLayout>
      <Container size="lg" mt={20}>
        <Box mx="auto" w="75%">
          <Flex direction="column">
            <TextInput placeholder="Project's title" size="xl" w="100%" mb={10} />
            <Box my={10}>
              <TagSelect />
            </Box>
            <TextEditor editor={editor} />
          </Flex>
        </Box>
      </Container>
    </MainLayout>
  );
}
