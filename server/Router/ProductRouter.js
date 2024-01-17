const  router =require("express").Router()
const  ProductControl=require("../Controllers/ProductControl")
const IsAuth=require("../authentication/Auth")
/* This code is defining various routes for handling different HTTP requests related to products. */
router.post("/Addproduct",IsAuth,ProductControl.AddProduct)
router.put("/updateproduct/:ProductId",IsAuth,ProductControl.UpdateProduct)
router.get("/getProductById/:ProductId",ProductControl.getProductById)
router.get("/getProductByCategory",ProductControl.getProductByCategory)
router.delete("/deleteProduct/:ProductId",ProductControl.deleteProduct)
router.get("/getAllProduct",ProductControl.getAllProducts)
router.get("/search",ProductControl.searchProducts)
router.get("/productsForAdmin",ProductControl.getProductsAdmin)
module.exports=router