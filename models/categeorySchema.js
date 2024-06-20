const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Category Name"],
      unique: [true, "Category Already Exist"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [32, "Name should not exceed 32 characters"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
