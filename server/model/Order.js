/* This code is defining a Mongoose schema for a Order object. */
const mongoose=require("mongoose")
const  OrderSchema= new mongoose.Schema({

    Amount:{
        type:Number,
        required:true       
    },
    Products:[
         {
             type:Object, required:true, ref:"Product"
        }
         ],
    User:[
         {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         }
    ] ,
    date: {
        type: Date,
        default: Date.now, // Default to the current date and time
    },
    



})
module.exports=mongoose.model("Order",OrderSchema)