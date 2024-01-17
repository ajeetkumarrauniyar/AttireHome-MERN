const router =require("express").Router()
const cartController=require("../Controllers/CartControl")
const IsAuth=require("../authentication/Auth")

router.get("/addtocart/:productId",IsAuth ,cartController.addToCart),
router.delete("/deleteFromcart/:productId",IsAuth ,cartController.deleteProductsFromCart),
router.get("/addQuantity/:productId",IsAuth ,cartController.addQuantity),
router.get("/minusQuantity/:productId",IsAuth ,cartController.minusQuantity),
router.delete("/emptycart",IsAuth ,cartController.emptyCart),
router.get("/getByUserId",IsAuth ,cartController.CartbyUserId),
router.get("/ShowCart",IsAuth ,cartController.ShowCart),
module.exports=router