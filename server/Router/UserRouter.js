/* The code snippet is defining a route handler for the "/signup" endpoint. When a POST request is made
to this endpoint, the handler function will be executed. */
const  router=require("express").Router()
const UserController=require("../Controllers/UserControl")
const IsAuth=require("../authentication/Auth")


/* The code is defining a route handler for the "/register" endpoint using the `post` method of the
`router` object. When a POST request is made to this endpoint, the handler function
`UserController.Register` will be executed. */
router.post("/register",UserController.Register)
router.post("/login",UserController.Login)
router.get("/getUserById/:userId",UserController.getUserBYId)
router.put("/updateUser/:userId",UserController.UpdateUser)
router.delete("/deleteUser/:userId",IsAuth,UserController.DeleteUser)
router.get("/getAllUser",UserController.getAllUser)
router.put("/resetPassword/:UserId",IsAuth,UserController.resetPassword)
module.exports =router