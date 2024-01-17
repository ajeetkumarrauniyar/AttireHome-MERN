const  Category=require("../model/Catagories")



exports.AddCategory=async(req,res,next)=>{
  const {Name,Description}=req.body
   const category=new Category({
    Name:Name,
    Description:Description
   })
 const data=await category.save()
 return res.status(200).json(data)
}

exports.getByProductId=async(req,res,next)=>{
  const ProductId=req.params.ProductId
  const CatData=await Category.findOne({ "Products.Products":ProductId})
  
  if(!CatData){
    return  res.status(404).json({msg:"Product Not Found"})
  }
  const Description=CatData.Products.find(p=>p.Products.toString()===ProductId.toString())
  console.log("Cataddata",CatData.Products,"description", Description)
  return res.status(200).json({CatData,Description})
}

exports.UpdateCategory=async(req,res,next)=>{
  const catId=req.params.catId
  const{Name,Description}=req.body
  const data= await Category.findOneAndUpdate({$or:[{_id:catId} , {Name:Name}]},{
    Name:Name,
    Description:Description
  },{
    new:true
  })
  if(!data){
    return res.status(404).json({msg:"category not found"})
  }
console.log(data)
 return res.status(200).json(data)
}



exports.getCategory=async(req,res,next)=>{
  const data=await Category.find()
  if(!data){
    return res.status(404).json({msg:"data not found"})
  }
  return res.status(200).json(data)
}

exports.deleteCategory=async(req,res,next)=>{
  const catId=req.params.catId
  const data= await Category.findOneAndDelete({_id:catId})
  if(!data){
    return res.status(404).json({msg:"category not found"})
  }
console.log(data)
 return res.status(200).json({msg:"Category removed"})
}
 exports.GetByName=async(req,res,next)=>{
  try{
      const Name=req.params.Name
      console.log(Name)
    const data= await Category.find({Name:Name}).populate("Products.Products","Name Price ImageUrl")
    if(!data){
      return res.status(404).json({msg:"data is not found"})
    }
    return res.status(200).json(data)

  }catch(err){
    console.log(err)
  }
 }