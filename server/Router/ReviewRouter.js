const router=require("express").Router()
const IsAuth=require("../authentication/Auth")
const reviewController=require("../Controllers/ReviewControl")

router.post("/addreview/:ProductId",IsAuth,reviewController.AddReview)
router.put("/updatereview/:ProductId",IsAuth,reviewController.UpdateReview)
router.get("/Reviewed/:ProductId",IsAuth,reviewController.reviewforfrontend)
router.get("/averageRating/:ProductId",IsAuth,reviewController.AverageRating)
router.get("/allreview",reviewController.AllReview)
router.delete("/deletereview",IsAuth,reviewController.deleteReview)
module.exports=router