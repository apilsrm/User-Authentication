import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))//which origin we allow are defined , in my case  CORS_ORIGIN=* we allow all addition ,  provide security for production level

// app.use(cors());

// to handle the data files from user ,we accept json (express.json) in older version we use body-paser to accept json but its by default , use limit json  data limit according to server we set
app.use(express.json({limit: "16kb"}))

//to handle data which come from url  from user
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//it will deals with public assects like image pdf icon favicon
app.use(express.static("public"))

// to use and manuplate secured cookie
app.use(cookieParser())

//routes 
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1", userRouter)


// http://localhost:4000/api/v1/register



export { app }