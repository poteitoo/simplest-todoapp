import {
  Box,
  Editable,
  EditableInput as ChakraEditableInput,
  EditablePreview,
  useRadio,
} from "@chakra-ui/react";

export function EditableInput({ title }) {
  return (
    <Editable defaultValue={title} my={2}>
      <EditablePreview />
      <ChakraEditableInput />
    </Editable>
  );
}

export function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "blue.200",
          color: "white",
          borderColor: "blue.200",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}
