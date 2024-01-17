const router=require("express").Router()
const IsAuth=require("../authentication/Auth")
const OrderController=require("../Controllers/OrderControl")
router.get("/checkoutToOrder",IsAuth,OrderController.getchecktoOrder )
router.get("/getUserById",IsAuth,OrderController.getOrderbyID )
router.get("/getAllOrders",OrderController.getALLOrder )
router.delete("/DeleteOrder/:OrderId",OrderController.DeleteOrder )
module.exports=router
