/* This code is defining a Mongoose schema for a user object. */
const mongoose=require("mongoose")
const  UserSchema= new mongoose.Schema({

    Name:{
        type:String,
        required:true       
    },
    Address:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    IsAuth:{
      type:Boolean,
      default:false
    },
    Cart:{
        Items:[{Product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        Quantity:{type:Number,required:true} 
    }]}


})
module.exports=mongoose.model("User",UserSchema)
