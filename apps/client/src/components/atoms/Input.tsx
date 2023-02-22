import {
  Flex,
  PasswordInput,
  PasswordInputProps,
  Text,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { get } from "object-path";
import { useFormContext } from "react-hook-form";

type RequiredProps = {
  name: string;
};

export const Input = {
  Text: function (props: TextInputProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <Flex direction="column">
        <TextInput {...props} {...register(props.name)} />
        {error && (
          <Text color="red" mt={4} fz="xs">
            {error}
          </Text>
        )}
      </Flex>
    );
  },

  Password: function (props: PasswordInputProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <Flex direction="column">
        <PasswordInput {...props} {...register(props.name)} />
        {error && (
          <Text color="red" mt={4} fz="xs">
            {error}
          </Text>
        )}
      </Flex>
    );
  },

  Textarea: function (props: TextareaProps & RequiredProps) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const error = get(errors, props.name)?.message;

    return (
      <Flex direction="column">
        <Textarea {...props} {...register(props.name)} />
        {error && (
          <Text color="red" mt={4} fz="xs">
            {error}
          </Text>
        )}
      </Flex>
    );
  },
};
