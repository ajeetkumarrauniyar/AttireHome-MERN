/* This code is defining a Mongoose schema for a product. */
const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      rating: {
        type: Number,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
        required: true,
      },
      comment: String, // User's comment for the rating
      date: {
        type: Date,
        default: Date.now, // Default to the current date and time
      },
    },
  ],
  AvgRating: {
    type: Number,
  },
  ImageUrl: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
