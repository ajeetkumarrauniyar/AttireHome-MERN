const router=require("express").Router()
const categoryController=require("../Controllers/CategoyControl")
router.post("/addcategory",categoryController.AddCategory)
router.get("/getByPid/:ProductId",categoryController.getByProductId)
router.get("/getCategory",categoryController.getCategory)
router.put("/updateCategory/:catId",categoryController.UpdateCategory)
router.delete("/deleteCategory/:catId",categoryController.deleteCategory)
router.get("/getbyName/:Name",categoryController.GetByName)

module.exports=router