import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: String,
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model("todo",todoSchema); 