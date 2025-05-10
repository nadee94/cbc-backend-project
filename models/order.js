import mongoose from "mongoose";

const orderSchema=mongoose.Schema({

        orderID :{
                type:String,
                required:true,
                unique:true
        },//CBC0003

        email :{
                type:String,
               required:true
        },

        name :{
            type:String,
            required:true
        },

        phone :{
            type:String,
            required:true
        },


        address :{
            type:String,
            required:true
        },

        status:{
            type:String,
            required:true,
            default:"pending"

        },

        labelledTotal:{
            type:Number,
            required:true
        },

        total :{
            type:Number,
            required:true
        },


        product:[
            {
                productInfo:{
                    productId:{
                        type:String,
                        required:true
                    },
                

                name:{
                    type:String,
                    required:true

                },

                altNames:[{
                    type:String
                }],
                
                description:{

                    type:String,
                    required:true
                },

                images:[{
                    type:String
                }],

            lablledPrice :{
                type:Number,
                required:true
            },


            price :{
                type:Number,
                required:true
            }

            }
        
        }

        
    ],
    date:{
            type:Date,
            default:Date.now
    }


       

       



})

const Order=mongoose.model("Orders",orderSchema)


export default Order;