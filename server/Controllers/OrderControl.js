const OrderModel = require("../model/Order")
const CartModel = require("../model/Cart")

exports.getchecktoOrder = async (req, res, next) => {
    
    let amount = 0
    const cartdata = await CartModel.findOne({ User: req.user }).populate("Product", "Name Price")
    const userData = await req.user.populate("Cart.Items.Product")
    //console.log(cartdata.Product)
    if (cartdata.Product.length > 0) {
        const data = userData.Cart.Items.map(p => {
            return { Quantity: p.Quantity, products: { ...p.Product._doc } }
        })
        // console.log(data)
        data.forEach(p => {
            amount += p.Quantity * p.products.Price
            // console.log(amount)
        })

        // console.log(products)
        const order = new OrderModel({
            Products: cartdata.Product,
            Amount: amount,
            User: req.user
        })
        const model = await order.save()
        cartdata.Product = []
        req.user.Cart.Items = []
        await cartdata.save()
        await req.user.save()
        return res.status(201).json({ Order: model, msg: "order is placed" })
    }

    return res.status(404).json({ msg: "User has no product in Cart" })


}


//clientID//

// console.log(cartdata.Product)
// const order=new OrderModel({
//     Amount:500,
//     // Product:{...cartdata.Product},
//     Products:[{Product:{...cartdata.Product}}],
//     User:req.user
// }) 
// const data=await order.save()              
// console.log(data)

// }
// // const cartdata=req.user.Cart.Items
// console.log(cartdata)
// }


exports.getOrderbyID = async (req, res, next) => {
    const Orderdata = await OrderModel.find({ User: req.user }).populate("User", "Name Address Email")
    if (!Orderdata) {
        return res.status(404).json({ msg: "there is no order by this User" })
    }
    return res.status(200).json(Orderdata)
}

exports.getALLOrder = async (req, res, next) => {
    const orders = await OrderModel.find({}).populate("User", "Name Address Email")
    if (!orders) {
        return res.status(404).json({ msg: "There is no orders" })
    }
    return res.status(200).json(orders)


}
exports.DeleteOrder=async(req,res,next)=>{
    const {OrderId}=req.params
    const deletedData=await OrderModel.findByIdAndDelete(OrderId)
    if(!deletedData){
        res.status(404).json({msg:"Order not found"})
    }
    return res.status(200).json("The order has been deleted")
}