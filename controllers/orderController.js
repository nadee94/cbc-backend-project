import Order from "../models/order.js"
import Product from "../models/product.js"

export async function createOrder(req,res) {
    if(req.user==null){
        res.status(403).json({
            message:"plaease login and try again"
        })
        return
    }

    const orderInfo=req.body

    if(orderInfo.name==null){
        orderInfo.name=req.user.firstName+ " " + req.user.lastName
    }

    console.log("req.user:", req.user); // Check what's inside


    let orderId="CBC0001"

    const lastOrder=await Order.find().sort({date:-1}).limit(1)

    if(lastOrder.length>0){
        const lastOrderId=lastOrder[0].orderID

        const lastOrderNmuberString=lastOrderId.replace("CBC","")//00551

        const lastOrderNumber =parseInt(lastOrderNmuberString)

        const newOrderNumber =lastOrderNumber+1

        const neworderNumberString=String(newOrderNumber).padStart(5,'0')

        orderId="CBC"+neworderNumberString
    }


   

    try{

        let total=0;
        let labelledTotal=0;
        const products=[]


        console.log("req.user:", orderInfo.products); // Check what's inside

        for(let i=0;i<orderInfo.products.length;i++){

             
            const item=await Product.findOne({productID:orderInfo.products[i].productId})


            console.log("req.userd:", item); // Check what's inside

            
            if(item==null){
                res.status(404).json({
                    message:"Product with productId"+orderInfo.products[i].productId+" not  Found"
                })
                return
            }

            if(item.isAvailable==false){
                res.status(404).json({
                    message:"Product with productId"+orderInfo.products[i].productId+" not available right now"

                })
                return
            }


            products[i]={
                productInfo:{
                    productId: item.productID,
                    name: item.name,
                    altNames: item.altNames, 
                    description: item.description,
                    images: item.images,
                    lablledPrice: item.labelledPrice,  // Fixed typo: 'lablledPrice' → 'labelledPrice'
                    price: item.price

                },
                quantity:orderInfo.products[i].qty
            }

           // total=total+(item.price*orderInfo.products[i].quantity)
            total+=(item.price * orderInfo.products[i].qty)
           
           //labelledTotal=labelledTotal+(item.labelledPrice*orderInfo.products[i].quantity)
           labelledTotal+=(item.labelledPrice * orderInfo.products[i].qty)
    
    
    }


        const order=new Order({
            orderID:orderId,
            email:req.user.email,
            name:orderInfo.name,
            address:orderInfo.address,
            total:0,
            phone:orderInfo.phone,
            product:products,
            labelledTotal:labelledTotal,
            total:total
        })


        const createdOrder=await order.save()
        res.json({

            message:"order created successfully",
            order:createOrder

        })

    }catch(err){

        res.status(500).json({
            
            message:"failed to create order",
            error:err,
        })

    }




    




}


