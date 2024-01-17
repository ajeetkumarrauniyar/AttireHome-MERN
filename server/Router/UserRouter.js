const  router=require("express").Router()
const UserController=require("../Controllers/UserControl")
const IsAuth=require("../authentication/Auth")

router.post("/register",UserController.Register)
router.post("/login",UserController.Login)
router.get("/getUserById/:userId",UserController.getUserBYId)
router.put("/updateUser/:userId",UserController.UpdateUser)
router.delete("/deleteUser/:userId",IsAuth,UserController.DeleteUser)
router.get("/getAllUser",UserController.getAllUser)
router.put("/resetPassword/:UserId",IsAuth,UserController.resetPassword)
module.exports =router