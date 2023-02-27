import { ActionIcon, Box, createStyles, Flex, List, Popover, Text } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { Link } from "@mantine/tiptap";
import { IconHelp } from "@tabler/icons-react";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { get } from "object-path";
import { Controller, useFormContext } from "react-hook-form";

type TextEditorProps = {
  content?: string;
  onChange: (value: string) => void;
};

type TextEditorControllerProps = {
  name: string;
  content?: string;
};

export function TextEditor(props: TextEditorControllerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, props.name)?.message;

  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field: { onChange } }) => (
        <>
          <Component content={props.content ?? ""} onChange={onChange} />
          {error && (
            <Text color="red" mt={4} fz="xs">
              {error}
            </Text>
          )}
        </>
      )}
    />
  );
}

function Component({ content, onChange }: TextEditorProps) {
  const { classes } = styles();

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
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <Box className={classes.editor}>
      <Popover
        width={350}
        position="right-start"
        shadow="sm"
        classNames={{ dropdown: classes.helpPopover }}
      >
        <Popover.Target>
          <ActionIcon className={classes.help}>
            <IconHelp size={24} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Flex direction="column" p={4} gap={6}>
            <Text color="gray.8">Example structure...</Text>
            <Text color="gray.8">(Not all points need to be met, just an example structure)</Text>
            <List>
              <List.Item>Project Instructions</List.Item>
              <List.Item>User Stories</List.Item>
              <List.Item>
                Ideas, e.g, this [package / library / framework] might be useful for this project
              </List.Item>
              <List.Item>Helpful Links</List.Item>
              <List.Item>Example Projects</List.Item>
            </List>
          </Flex>
        </Popover.Dropdown>
      </Popover>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
}

const styles = createStyles((theme) => ({
  editor: {
    position: "relative",
  },

  help: {
    color: theme.colors.gray[5],
    position: "absolute",
    top: 0,
    right: -30,
    zIndex: 10,
  },

  helpPopover: {
    border: `1px solid ${theme.colors.gray[4]}`,
  },
}));
