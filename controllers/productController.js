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

        await Product.deleteOne({productId:req.params.productId})

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

