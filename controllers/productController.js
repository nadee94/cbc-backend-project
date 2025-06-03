import Product from "../models/product.js";
import { isAdmin } from "./userController.js";




export async function getProduct(req,res){
    
    try{

        if(isAdmin(req)){
            const products=await Product.find()
            res.json(products)
        }else{
            const products=await Product.find({isAvailable:true})
            res.json(products)
        }

    }catch(err){
        res.json({
            message:"failed to get product",
            error:err
        })
    }
    
    
    
}




export function saveProdct (req,res){



/*
    if(req.user==null){
        res.status(403).json({
            message:"unAuthorizedr"
        })
    
    return
    }

    

    if(req.user.role!="admin"){
        res.status(403).json({
            message:"unAuthorizedr you need to be an admin"
        })
    
    return
    }
*/

        if(!isAdmin(req)){
            res.status(403).json({
                message:"You are not authorized to add a product"
            })

            return
        }


    //console.log(req.body)

  const product=new Product(
        
            req.body
        

    )

    product.save().then(()=>{
        res.json({
            message:"product added successfully"

        })
    }).catch(()=>{
        res.json({
            message:"product failed to add"
         })     
    })
    

}

export async function deleteProduct(req,res){
    

    if(!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to delete a product"
        })
        return
    }
    try{

        await Product.deleteOne({productID:req.params.productID})

        res.json({
            message:"product deleted  successfully"
        })


    }catch(err){
        res.status(500).json({
            message :"failed to delete product",
            error:err
    })

    }

   
}


export async function updateProduct(req,res){
    if (!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to update a product"
        })

        return
    }

    const productID=req.params.productID
    const updatingData=req.body


    try{
        
        await Product.updateOne(

            {productID:productID},
            updatingData


        )
        res.json({
            message:"product updated successfully"
        })


    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })

    }
}

/*

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "You are not authorized to update a product"
        });
        return;
    }

    const productId = req.params.productId;
    const updatingData = req.body;

    try {
        const result = await Product.updateOne(
            { productId: productId },
            { $set: updatingData }  // Ensures partial updates work
        );

        if (result.matchedCount === 0) {
            res.status(404).json({
                message: "Product not found"
            });
        } else if (result.modifiedCount === 0) {
            res.status(200).json({
                message: "No changes made to the product"
            });
        } else {
            res.json({
                message: "Product updated successfully"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    }
}
*/



export async function getProductByID(req,res){
    const productId=req.params.productId
    try{

        const product=await Product.findOne(
            {productId:productId}
        )

        if(product==null){
            res.status(404).json({
                message:"Product not Found"
            })
            return
        }

        if(product.isAvailable){
            res.json(product)
        }else{
            if(!isAdmin(req)){
                res.status(404).json({
                    message:"Product not found"
                })
                return
            }else{
                res.json(product)
            }

        }

    } catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err
        })

    }
}