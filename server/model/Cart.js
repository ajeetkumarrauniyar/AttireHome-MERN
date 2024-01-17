/* This code is defining a Mongoose schema for a Cart model. */
const mongoose=require("mongoose")
const CartSchema=new mongoose.Schema({
    Product:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
 ],
 User:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 ]
})
module.exports=mongoose.model("Cart",CartSchema)