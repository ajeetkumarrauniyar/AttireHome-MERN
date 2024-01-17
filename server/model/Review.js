/* The code is defining a Mongoose schema for a review. */
const mongoose=require("mongoose")
const  ReviewSchema=new mongoose.Schema({
    Product:
    {
   type:mongoose.Schema.Types.ObjectId,
   ref:"Product",
   required:true

 
  }, 

User:[
    {
      userid: { type:mongoose.Schema.Types.ObjectId,
        ref:"User"
            } ,
        Comments:{
            type:String,
            required:true
        },
        Rating:{
            type:Number,
            required:true
        }

    }
],
// Comments:{
//     type:String,
//     required:true
// },
// Rating:{
//     type:Number,
//      required:true
// }
})
module.exports=mongoose.model("Review",ReviewSchema)