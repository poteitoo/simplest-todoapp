import { useState } from "react";
import { Container, HStack, Input, Button } from "@chakra-ui/react";
import { TodoList } from "./components/organisms";
import { makeId } from "./utils";
import { useEffect } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todo = localStorage.getItem("todoapp");
    if (!todo) return;
    const parsedTodo = JSON.parse(todo);
    if (parsedTodo.length > 0) setTodoList(parsedTodo);
  }, []);

  useEffect(() => {
    const todo = JSON.stringify(todoList);
    localStorage.setItem("todoapp", todo);
    console.table(todoList);
  }, [todoList]);

  const addTodo = () => {
    if (title.length === 0) return;
    const todo = {
      title,
      id: makeId(5),
      status: "pendding",
      createdAt: Date(),
      updatedAt: Date(),
    };
    setTodoList((s) => [todo, ...s]);
  };
  const updateTodoStatus = (id, status) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    if (index < 0) return;
    todoList[index].status = status;
    todoList[index].updatedAt = Date();
    setTodoList([...todoList]);
  };

  return (
    <Container h="full" mt="8">
      <HStack mb="8">
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={() => addTodo()}>追加</Button>
      </HStack>
      <TodoList todoList={todoList} onChangeStatus={updateTodoStatus} />
    </Container>
  );
}
