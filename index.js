import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import jwt from "jsonwebtoken";
import orderRouter from "./routes/orderRoute.js";
import cors from 'cors';


const app = express();
app.use(cors())

app.use(bodyParser.json());

app.use(
    (req,res,next)=>{
        const tokenString=req.header("Authorization")
        if(tokenString!=null){
            const token=tokenString.replace("Bearer ","")
        //console.log(token)

        jwt.verify(token,"cbc-batch-five#@2025",

            (err,decoded)=>{
                if(decoded!=null){
                    req.user=decoded
                    next()
                   // console.log(decoded)
                }
                else{
                  //  console.log("invalid token")
                    res.status(403).json({
                        message:"Invalid Token"
                    })


                }
            }
        )

        }
        else{
            next()
        }

       // next()
    }
)

mongoose.connect("mongodb+srv://admin:123@cluster0.x8moj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("connected to database")
    }
).catch(
    ()=>{
        console.log("connection failed")
    }
)


app.use("/students",studentRouter);
app.use("/products",productRouter);
app.use("/users",userRouter);
app.use("/orders",orderRouter);





app.listen(4000,
    () => {
        console.log('server is running 40000')
    }

);