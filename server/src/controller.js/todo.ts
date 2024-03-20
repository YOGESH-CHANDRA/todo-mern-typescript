import { Response, Request } from "express";
import { TodoModel } from "../../Schema/todo";

export const addTodo = async (req: Request, res: Response) => {
  const { todo } = req.body;
  try {
    console.log(todo);
    if (!todo) {
      return res.status(400).send("Todo is empty");
    }
    const newTodo = await TodoModel.create({ todo });
    console.log(newTodo);
    return res.status(201).send({ msg: "Todo added successfully", newTodo });
  } catch (error:any) {
    return res.status(500).send(error.message);
  }
};

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const allTodo = await TodoModel.find();
    // console.log(allTodo);
    return res.status(200).send(allTodo);
  } catch (error:any) {
    return res.status(500).send(error.message);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // console.log(id);
    const deleteTodo = await TodoModel.findByIdAndDelete({ _id: id });
    // console.log(deleteTodo);
    return res
      .status(200)
      .send({ msg: "todo deleted successfully", deleteTodo });
  } catch (error:any) {
    return res.status(500).send(error.message);
  }
};
