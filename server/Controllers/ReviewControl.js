const ReviewSchema = require("../model/Review");
const ProductSchema = require("../model/Product");

exports.AddReview = async (req, res, next) => {
  const ProductId = req.params.ProductId;
  const ProductData = await ProductSchema.findById(ProductId);

  try {
    if (!ProductData) {
      return res.status(404).json({ msg: "Product not found" });
    }

    console.log("ProductData.ratings:", ProductData.ratings);
    if (ProductData.ratings.length > 0) {
      const foundObject = ProductData.ratings.find(
        (obj) => obj.userId.toString() === req.user._id.toString()
      );

      console.log("req.user._id:", req.user._id);
      console.log("foundObject:", foundObject);

      if (foundObject) {
        return res
          .status(302)
          .json({ msg: "User has already reviewed the product" });
      }
    }

    const { Comments, Rating } = req.body;

    if (!Comments || !Rating) {
      return res
        .status(400)
        .json({ msg: "One or more mandatory fields are empty" });
    }
    const foundReview = await ReviewSchema.findOne({ Product: ProductId });
    if (foundReview) {
      console.log(foundReview);
      const newUser = {
        userid: req.user,
        Comments: Comments,
        Rating: Rating,
      };
      foundReview.User.push(newUser);
      await foundReview.save();
    } else if (!foundReview) {
      const reviewD = new ReviewSchema({
        Product: ProductId,
        User: { userid: req.user, Comments: Comments, Rating: Rating },
      });
      const newReview = await reviewD.save();
      console.log({ "new review": newReview });
    }

    const reviewData = {
      userId: req.user._id, // Assuming req.user contains the user ID
      rating: Rating,
      comment: Comments,
    };

    // Add the review to the product's ratings array
    ProductData.ratings.push(reviewData);

    let totalRating = 0;
    let totalUser = [];
    // const RatingsArry = ProductData.ratings
    for (const review of ProductData.ratings) {
      // console.log(review)
      totalUser.push(review.userId);
      totalRating += review.rating;
      console.log(totalRating);
    }
    console.log(totalUser.length);
    const avgRating = Math.ceil(totalRating / totalUser.length);
    ProductData.AvgRating = avgRating;
    console.log(avgRating);

    // Save the updated product data
    await ProductData.save();

    return res.status(201).json({
      msg: "Review added successfully",
      data: ProductData.ratings,
      foundReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.AverageRating = async (req, res, next) => {
  const { ProductId } = req.params;

  // console.log(ProductId)
  const Pdata = await ProductSchema.findById(ProductId);

  await ProductSchema.findByIdAndUpdate(ProductId);

  await Pdata.save();
};

exports.UpdateReview = async (req, res, next) => {
  const ProductId = req.params.ProductId;
  const { Comments, Rating } = req.body;
  const reviewData = await ReviewSchema.findOneAndUpdate(
    { Product: ProductId },
    {
      Comments: Comments,
      Rating: Rating,
    },
    {
      new: true,
    }
  );
  if (!reviewData) {
    return res.status(404).json({ msg: "no products found" });
  }
  return res.status(200).json({ reviewData, msg: "Review Updated" });
};

exports.AllReview = async (req, res, next) => {
  const reviewData = await ReviewSchema.find({});
  if (!reviewData) {
    return res.status(404).json({ msg: "no products reviewed" });
  }
  return res.status(200).json({ reviewData, msg: "Reviewes" });
};

exports.deleteReview = async (req, res, next) => {
  const review = await ReviewSchema.findOne({ User: req.user });
  if (!review) {
    return res.status(404).json({ msg: "no products reviewed" });
  }

  const reviewData = await ReviewSchema.findOneAndDelete({ User: req.user });

  return res.status(200).json({ reviewData, msg: "Reviewes deleted" });
};

exports.reviewforfrontend = async (req, res, next) => {
  try {
    const ProductId = req.params.ProductId;
    const ExistReview = await ReviewSchema.find({
      Product: ProductId,
    }).populate("User.userid", "Name");

    if (!ExistReview) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.status(200).json({ reviews: ExistReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
