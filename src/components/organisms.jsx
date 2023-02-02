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
import { MyEditableInput, RadioCard } from "./molecules";

export function TodoList({ todoList, onChangeStatus }) {
  const todoStatuses = {
    completed: "🥳",
    progressing: "🔥",
    pendding: "👀",
    canceled: "😱",
  };
  return (
    <TableContainer h="3xl" overflowY="auto" pos="relative">
      <Table>
        <Thead>
          <Tr>
            <Th>タイトル</Th>
            <Th>ステータス</Th>
          </Tr>
        </Thead>
        <Tbody maxH="3xl" overflow="hidden">
          {todoList.map((todo) => {
            return (
              <Tr key={todo.id}>
                <Td>
                  <MyEditableInput title={todo.title} />
                </Td>
                <Td>
                  <RadioButtonList
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

function RadioButtonList({ options, onChangeStatus }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "pendding",
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
