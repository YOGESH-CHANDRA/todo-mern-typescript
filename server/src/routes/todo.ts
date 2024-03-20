import { Router } from "express";
import { addTodo, deleteTodo, getAllTodo } from "../controller.js/todo";

export const todoRouter: Router = Router();

todoRouter.route("/").get(getAllTodo).post(addTodo);
todoRouter.route("/:id").delete(deleteTodo);
