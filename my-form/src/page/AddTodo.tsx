import { useState } from "react";
import FetchData from "../Utils/Fetch";

interface AddTodo {
  todo: string;
  completed: boolean;
  userId: number;
}

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState(5);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("trigger submit");
    const newTodo: AddTodo = {
      todo: todo,
      completed: false,
      userId: userId,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    };

    const response = await FetchData(
      "https://dummyjson.com/todos/add",
      options
    );
    if (response) {
      alert("success add todo!");
    }
  };

  return (
    <>
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="todo"
          onChange={(e: any) => {
            setTodo(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="user id"
          onChange={(e: any) => {
            setUserId(e.target.value);
          }}
        />

        <button>Submit</button>
      </form>
    </>
  );
};

export default AddTodo;
