const Product = require("../model/Product")
const CategoryModel = require("../model/Catagories")

/* The `exports.AddProduct` function is an asynchronous function that is used to add a new product to
the database. It takes in the request, response, and next middleware function as parameters. */
exports.AddProduct = async (req, res, next) => {
    try {
        const { Name, Price, Quantity, CategoryName, Description, ImageUrl } = req.body
        if (!Name || !Price || !Quantity || !CategoryName || !ImageUrl) {
            return res.status(400).send({ msg: "One or more field is empty" })
        }
        let category = await CategoryModel.findOne({ Name: CategoryName })
        //  console.log(category)
        if (!category) {
            const categoryData = new CategoryModel({
                Name: CategoryName,
                Description: Description,
                Product: []
            })
            category = await categoryData.save()

        }
        console.log(category)
        const product = new Product({
            Name: Name,
            Price: Price,
            ImageUrl: ImageUrl,
            Quantity: Quantity,
            Ratings: [],
            Category: category._id
        })

        const productData = await product.save()
        const pushdata = {
            Products: productData._id,
            Description: Description
        }
        category.Products.push(pushdata)
        await category.save()

        return res.status(201).json({ msg: "product created succesfully", productData })

    }
    catch (err) {
        console.log(err)
    }
}
/* The `exports.UpdateProduct` function is an asynchronous function that is used to update a product in
the database. */
exports.UpdateProduct = async (req, res, next) => {
    try {
        const { Name, Price, Quantity, CategoryName, Description, } = req.body
        const ProductId = req.params.ProductId
        const product = await Product.findById(ProductId)
        if (!product) {
            return res.status(404).json({ msg: "product not found" })
        }
        let category = await CategoryModel.findOne({ Name: CategoryName })
        //  console.log(category)
        if (!category) {
            const categoryData = new CategoryModel({
                Name: CategoryName,
                Description: Description,
                Products: []
            })
            category = await categoryData.save()
          
            const pushdata = {
            Products: ProductId,
            Description: Description
        }
        category.Products.push(pushdata)
        await category.save()
 
       }

        const UpdatedProducts = await Product.findByIdAndUpdate({ _id: ProductId }, {
            Name: Name,
            Price: Price,
            Quantity: Quantity,
            Category: category._id,
            Description: Description
        }, {
            new: true
        })
        console.log("ok")
        return res.status(200).json({ msg: "Product updataed", UpdatedProducts })
        
    }
    catch (err) {
        console.log(err)
    }
}
/* The `exports.getProductById` function is an asynchronous function that is used to retrieve a
specific product from the database based on its ID. It takes in the request, response, and next
middleware function as parameters. */
exports.getProductById = async (req, res, next) => {
    try {
        const ProductId = req.params.ProductId
        const product = await Product.findById({ _id: ProductId }).populate("Category", "Name  Products.Products.Description")
        if (!product) {
            return res.status(404).json({ msg: "product not found" })
        }

        return res.status(200).json(product)
    }
    catch (err) {
        return res.json({ msg: "product not found maybe some error occured" })
        console.log(err)
    }
}
/* The `exports.getProductByCategory` function is an asynchronous function that is used to retrieve
products from the database based on a specific category. */
exports.getProductByCategory = async (req, res, next) => {
    try {
        const { Category } = req.body
        const product = await Product.findOne({ Category: { Name: Category } })
        if (!product) {
            return res.status(404).json({ msg: "product not found" })
        }

        return res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
    }
}
/* The `exports.deleteProduct` function is an asynchronous function that is used to delete a product
from the database. */
exports.deleteProduct = async (req, res, next) => {
    try {
        const ProductId = req.params.ProductId
        const product = await Product.findById(ProductId)
        if (!product) {
            return res.status(404).json({ msg: "product not found" })
        }
        await Product.findByIdAndDelete(ProductId)

        return res.status(200).json({ msg: "product removed" })
    }
    catch (err) {
        console.log(err)
    }
}


/* The `exports.getAllProducts` function is an asynchronous function that is used to retrieve all
products from the database. */
exports.getAllProducts = async (req, res, next) => {
    try {
         let  page = +req.query.page|| 1
        // console.log(page)
        const items_per_page=4
        const count =await Product.countDocuments()
        const product = await Product.find().skip((page-1)*items_per_page).limit(items_per_page)
     //  = await Product.find().populate("Category", "Name  Description")
        if (!product) {
            return res.status(404).json({ msg: "no productfound" })
        }

        //  console.log(product)
        return res.status(200).json({ Product: product ,totalDocument: count})
    }
    catch (err) {
        console.log(err)
    }
}
exports.getProductsAdmin = async (req, res, next) => {
    try {
     
        const product = await Product.find({})
    
        if (!product) {
            return res.status(404).json({ msg: "no productfound" })
        }

        //  console.log(product)
        return res.status(200).json({ Product: product })
    }
    catch (err) {
        console.log(err)
    }
}




exports.searchProducts= async (req, res) => {
    const {searchItem} = req.query; 
    try {
      const products = await Product.find({
        $or: [
          { Name: { $regex: searchItem, $options: 'i' } }          
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "no products found" });
    }
  };


