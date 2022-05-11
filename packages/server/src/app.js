import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import "../db/mongoose.js"
import userRouter from "./router/user.js"
import taskRouter from'./router/task.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({origin: '*'}));
app.use(userRouter)
app.use(taskRouter)
app.use(express.urlencoded({extended:true}))





app.listen(3001,()=>{
    console.log("runing server")
    console.log(process.env.DB_USERDETAIL);
})