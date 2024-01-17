const express=require("express")


const  mongoose=require("mongoose")
require("dotenv").config()
const Url=process.env.Url
const Cors=require("cors")
const UserRouter=require("./Router/UserRouter")    
const ProductRouter=require("./Router/ProductRouter")    
const CategoryRouter=require("./Router/CategoryRouter")    
const CartRouter=require("./Router/CartRouter")    
const OrderRouter=require("./Router/OrderRouter")    
const ReviewRouter=require("./Router/ReviewRouter")    
const MulterRouter=require("./Router/multerRouter")    
/* The code is importing the necessary modules and setting up the environment variables for the
application. */
global.__basedir = __dirname;
const app=express()
app.use(express.json())
app.use(Cors())

app.use(UserRouter)
app.use(CategoryRouter)
app.use(MulterRouter)
app.use(ProductRouter)
app.use(CartRouter)
app.use(OrderRouter)
app.use(ReviewRouter)
// const jwt=process.env.JWT_Secret
// console.log(jwt)

/* The code  is establishing a connection to a MongoDB database using the URL
provided in the `Url` variable. */
mongoose.connect(Url)
.then(()=>{
     app.listen(8080,()=>{
        console.log('database Connected')
     })
})
.catch(err=>{
    console.log(err)
})







