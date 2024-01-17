const CartModel = require("../model/Cart");

/* The `addToCart` function is responsible for adding a product to the user's cart. */
exports.addToCart = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const CartUser = await CartModel.findOne({ User: req.user });
    let Quantity = 1;

    if (CartUser) {
      let existProduct = req.user.Cart.Items.find(
        (p) => p.Product.toString() === productId.toString()
      );
      if (existProduct) {
        let existIndex = req.user.Cart.Items.findIndex(
          (p) => p.Product.toString() === productId.toString()
        );
        console.log(existIndex);
        const ud = (req.user.Cart.Items[existIndex].Quantity += 1);
        existProduct = await req.user.save();
        // console.log(ud)
        return res
          .status(201)
          .json({ cart: CartUser, UserCartdata: req.user.Cart });
      }
      const Userdata = {
        Product: productId,
        Quantity: Quantity,
      };
      CartUser.Product.push(productId);
      await CartUser.save();
      req.user.Cart.Items.push(Userdata);
      await req.user.save();
      return res
        .status(201)
        .json({ cart: CartUser, UserCartdata: req.user.Cart });
    }

    const cart = new CartModel({
      Product: productId,
      User: req.user,
    });
    const Userdata = {
      Product: productId,
      Quantity: Quantity,
    };
    req.user.Cart.Items.push(Userdata);
    await req.user.save();
    const data = await cart.save();

    return res.status(201).json({ msg: "product added to cart", data: data });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProductsFromCart = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    // Find the user's cart
    const cart = await CartModel.findOne({ User: req.user._id });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Check if the product exists in the cart
    const existProductIndex = cart.Product.findIndex(
      (p) => p._id.toString() === productId.toString()
    );

    if (existProductIndex !== -1) {
      // Remove the product from the cart
      cart.Product.pull({ _id: productId });
      await cart.save();

      // Remove the product from the user's cart items (if applicable)
      if (req.user.Cart && req.user.Cart.Items) {
        const UserCartIndex = req.user.Cart.Items.findIndex(
          (item) => item.Product.toString() === productId.toString()
        );
        if (UserCartIndex !== -1) {
          req.user.Cart.Items.splice(UserCartIndex, 1);
        }
      }

      await req.user.save();

      return res.status(200).json(cart);
    }

    return res.status(404).json({ msg: "Product doesn't exist in the cart" });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

/* The `deleteProductsFromCart` function is responsible for removing a product from the user's cart. */
// exports.deleteProductsFromCart = async (req, res, next) => {
//     const productId = req.params.productId

//     const data = await CartModel.findOne({ User: req.user })
//     if (!data) {
//         return res.status(200).json({ msg: "Cart not found" })
//     }
//     console.log(data)
//     const existProduct=data.Product.find(p=>p._id.toString()===productId.toString())
//     console.log(existProduct)
//     if(existProduct){
//         data.Product.pull(productId)
//         await data.save()
//         const UserCartIndex= req.user.Cart.Items.findIndex(p=>p.Product.toString() ===productId.toString)
//         console.log(UserCartIndex)
//         req.user.Cart.Items[UserCartIndex]={}
//         await req.user.save()

//         return res.status(200).json(data)
//     }

//     return res.status(200).json("product doesnt exist")

// }

exports.addQuantity = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const CartUser = await CartModel.findOne({ User: req.user });
    let Quantity = 1;

    if (CartUser) {
      let existProduct = req.user.Cart.Items.find(
        (p) => p.Product.toString() === productId.toString()
      );
      if (existProduct) {
        let existIndex = req.user.Cart.Items.findIndex(
          (p) => p.Product.toString() === productId.toString()
        );
        console.log(existIndex);
        const ud = (req.user.Cart.Items[existIndex].Quantity += 1);
        existProduct = await req.user.save();
        // console.log(ud)
        return res.status(201).json({
          msg: "product increased",
          Items: req.user.Cart.Items[existIndex],
        });
      }
      return res.status(200).json({ msg: "there is no carts by th user" });
    }
  } catch (Err) {
    console.log(Err);
  }
};
exports.minusQuantity = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const CartUser = await CartModel.findOne({ User: req.user });
    let Quantity = 1;

    if (CartUser) {
      let existProduct = req.user.Cart.Items.find(
        (p) => p.Product.toString() === productId.toString()
      );
      console.log("existProduct", existProduct);
      if (existProduct.Quantity > 1) {
        let existIndex = req.user.Cart.Items.findIndex(
          (p) => p.Product.toString() === productId.toString()
        );
        // console.log(existIndex)
        const ud = (req.user.Cart.Items[existIndex].Quantity -= 1);
        existProduct = await req.user.save();
        // console.log(ud)
        return res.status(201).json({
          msg: "product decreases",
          Items: req.user.Cart.Items[existIndex],
        });
      }

      return res
        .status(502)
        .json({ msg: "you can't decrease the Quantity from now" });
    }
    return res.status(404).json({ msg: "there is no carts by th user" });
  } catch (Err) {
    console.log(Err);
  }
};

/* The `exports.emptyCart` function is responsible for emptying the user's cart. */
exports.emptyCart = async (req, res, next) => {
  const data = await CartModel.find({ User: req.user });
  console.log(data);
  if (!data) {
    return res.status(200).json({ msg: "Cart not found" });
  }
  data[0].Product = [];
  req.user.Cart.Items = [];
  await req.user.save();
  await data[0].save();
  return res.json("cart  empty");
};
/* The `exports.CartbyUserId` function is responsible for retrieving the user's cart based on their
user ID. */
exports.CartbyUserId = async (req, res, next) => {
  try {
    let amount = 0;
    let totalitems = 0;
    const UserCart = await CartModel.findOne({ User: req.user }).populate(
      "Product",
      "Name Price Quantity  ImageUrl Category._id"
    );
    //   console.log(UserCart)
    if (!UserCart) {
      return res.status(404).json("user doesnt have a cart");
    }
    const usercartdata = await req.user.populate("Cart.Items.Product");
    const data = usercartdata.Cart.Items.map((p) => {
      return { Quantity: p.Quantity, products: { ...p.Product._doc } };
    });
    // console.log(data)
    data.map((p) => {
      amount += p.Quantity * p.products.Price;
      totalitems += p.Quantity;
    });
    //   console.log(amount)
    //   console.log(totalitems)

    return res.status(200).json({
      UsersItems: UserCart,
      dataInUserM: data,
      Amount: amount,
      totalItems: totalitems,
    });
  } catch (err) {
    console.log(err);
  }
};

/* The `exports.ShowCart` function is responsible for retrieving all the carts available in the system.
It uses the `CartModel` to find all the carts and returns them as a JSON response. If there are no
carts available, it returns a 404 status code with a message indicating that there are no carts
available. */
exports.ShowCart = async (req, res, next) => {
  const Cart = await CartModel.find();
  console.log(Cart);
  if (!Cart) {
    return res.status(404).json(" no cart available");
  }
  return res.status(200).json(Cart);
};

//addtocart/64fedd22dfff83fb5 ec18f54
