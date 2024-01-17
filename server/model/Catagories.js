/* This code is defining a Mongoose schema for a categories object. */
const mongoose=require("mongoose")

const  CategorySchema= new mongoose.Schema({
    
    Name:{
        type:String,
        required:true ,
        
    },
   
    Products:[{
       Products:{   type:mongoose.Types.ObjectId,ref:"Product"},
       Description:{type:String, }
    }]

})
module.exports=mongoose.model("Category",CategorySchema)