import express from "express";
import { deleteProduct, getProduct, saveProdct } from "../controllers/productController.js";

const productRouter=express.Router()

productRouter.get("/",getProduct);

productRouter.post("/",saveProdct);

productRouter.delete("/:productId",deleteProduct);


export default productRouter;
