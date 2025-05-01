import express from "express";
import Student from "../models/student.js";
import { getSudents, saveStudent } from "../controllers/studentController.js";

const studentRouter=express.Router();


studentRouter.get("/",getSudents);


studentRouter.post("/",saveStudent);






export default studentRouter;
