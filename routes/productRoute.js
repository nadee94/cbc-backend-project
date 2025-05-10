import express from "express";
import { deleteProduct, getProduct, getProductByID, saveProdct, updateProduct } from "../controllers/productController.js";

const productRouter=express.Router()

productRouter.get("/",getProduct);

productRouter.post("/",saveProdct);

productRouter.delete("/:productID",deleteProduct);

productRouter.put("/:productID",updateProduct);


productRouter.get("/:productID",getProductByID);


export default productRouter;
