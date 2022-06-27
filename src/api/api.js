// api - 데이터를 주고받는 방법
// API를 짠다~ -> crud를 어떻게 할지 짜본다~ / 이 연습  프로젝트 내에서의 예제

import axios from "axios";
// 서버와의 비동기 통신을 도와주는 친구

const todoApi = axios.create({
  // 서버 주소
  baseURL: "http://localhost:3500",
});

//CRUD
// C - post
export const addTodo = async (payload) => {
  //데이터를 payload안에 담아서 전달해야함
  return await todoApi.post("/todos", payload);
  //response는 없으니 return 후 post에 대한 내용을 db.json으로 전달
};

// R - get
export const getTodos = async () => {
  // /todos - api 주소, 데이터를 받아올 주소,  response - 서버가 준 데이터를 저장
  const response = await todoApi.get("/todos");
  // response가 객체로 온다. 그 객체를 까보니 안에 data가있어서 data에 접근하려면 data도 써준다.
  return response.data;
};

// U - put : 다 바꾼다, patch : 하나만 바꾼다
export const updateTodo = async (payload) => {
  //템플릿 리터럴 : 문자열 안에 변수 사용하고싶을때 사용
  return await todoApi.patch(`/todos/${payload.id}`, payload)
}

// D - delete
export const deleteTodo = async ({ id }) => {
  //{ id } 감싸준 이유 : 객체의 비구조화
  return await todoApi.delete(`/todos/${id}`, id);
};