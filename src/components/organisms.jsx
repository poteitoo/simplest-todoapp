import {
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useRadioGroup,
} from "@chakra-ui/react";
import { EditableInput, RadioCard } from "./molecules";

export function TodoList({ todoList, onChangeText, onChangeStatus }) {
  const todoStatuses = {
    completed: "π₯³",
    progressing: "π₯",
    pendding: "π",
    canceled: "π±",
  };
  return (
    <TableContainer h="xl" overflowY="auto" pos="relative">
      <Table>
        <Thead>
          <Tr>
            <Th>γΏγ€γγ«</Th>
            <Th>γΉγγΌγΏγΉ</Th>
          </Tr>
        </Thead>
        <Tbody maxH="3xl" overflow="hidden">
          {todoList.map((todo) => {
            return (
              <Tr key={todo.id}>
                <Td>
                  <EditableInput
                    title={todo.title}
                    onChangeText={(newText) => onChangeText(todo.id, newText)}
                  />
                </Td>
                <Td>
                  <RadioButtonList
                    defaultValue={todo.status}
                    options={todoStatuses}
                    onChangeStatus={(newStatus) =>
                      onChangeStatus(todo.id, newStatus)
                    }
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function RadioButtonList({ defaultValue, options, onChangeStatus }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "todoapp",
    defaultValue: defaultValue,
    onChange: onChangeStatus,
  });
  const group = getRootProps();

  return (
    <HStack {...group}>
      {Object.keys(options).map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {options[value]}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
