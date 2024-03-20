import { FormEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";

import "./App.css";
import axios from "axios";
import { baseUrl } from "./constant/api";

function App() {
  const [todoList, setTodoList] = useState<any>([]);
  const [todoItem, setTodoItem] = useState<string | any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getTodoList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/api/todo`);
      toast.success(data.msg);
      setTodoList(data);
      setLoading(false);
    } catch (error:any) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      else{
        console.log(error.message)
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${baseUrl}/api/todo`, {
        todo: todoItem,
      });
      toast.success(data.msg);
      setTodoItem("");
      getTodoList();
      setLoading(false);
    } catch (error:any) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      else{
        console.log(error.message)
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const deleteHandler = async (id: unknown) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${baseUrl}/api/todo/${id}`);
      getTodoList();
      toast.success(data.msg);
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        toast.error(error.response.data);
      }
      else{
        console.log(error.message)
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);
  return (
    <>
      <div className="app container bg-primary rounded-1 vh-100 w-50 py-2">
        <h1 className="text-center bg-light">ToDo List</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="w-100 p-1"
            placeholder="Enter the todo"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-sm btn-danger my-2 float-end"
          >
            ADD
          </button>
        </form>
        {loading===false?null:<h4 className="text-center m-auto">Applicatin refreshing.......</h4>}


        <div className="mt-5 row">
          {todoList.length > 0 &&
            todoList.map((item: any, i: number) => (
              <div className="d-flex m-1 col-11" key={item._id}>
                <span className="bg-danger  rounded-circle col-1 text-center">
                  {i}
                </span>
                <div className="bg-warning col-9 mx-2 px-2">{item.todo}</div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
