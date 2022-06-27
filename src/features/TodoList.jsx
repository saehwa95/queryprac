import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  // todo - 내가 할 일 리스트
  const [newTodo, setNewTodo] = useState("");
  // useQueryClient -> 여기서 쿼리를 사용하겠다. /캐시 데이터와 우리의 연결을 도와주는 애
  const queryClient = useQueryClient();

  // R
  const {
    isLoading, 
    isError, 
    error, 
    data:todos,
  } = useQuery("todos", getTodos)

  // useMutation - CUD를 해주는 친구
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      // 캐시에 있는 모든 쿼리를 무효화한다.
      queryClient.invalidateQueries("todos");
      alert("추가에 성공하였습니다.!");
    },
  });


  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      // 캐시에 있는 모든 쿼리를 무효화한다.
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      // 캐시에 있는 모든 쿼리를 무효화한다.
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className="todo">
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodoMutation.mutate({
                  ...todo,
                  completed: !todo.completed,
                })
              }
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button
            className="trash"
            onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }
  console.log(todos);

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
