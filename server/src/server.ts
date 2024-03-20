import express,{Response, Request, Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todo";
import {mongoDb} from "../db/conn";

dotenv.config();



const port =process.env.PORT ||5000;

const app:Application=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/api/todo",todoRouter);

app.get("/",(req:Request, res:Response)=>{
    res.send("App is running");
})



mongoDb()
.then(()=>app.listen(port, ()=>console.log(`Server is running on port no. ${port}`)))
.catch((err)=>console.log("Data base not connected : ", err))
