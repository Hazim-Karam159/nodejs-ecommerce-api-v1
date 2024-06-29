const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Brand Name"],
    unique: [true, "Brand Already Exist"],
    minlength: [2, "Too Short Brand Name"],
    maxlength: [32, "Too Long Brand Name"],
  },

  slug: {
    type: String,
    lowercase: true,
  },

  image: String,
}
  , { timestamps: true });

module.exports = mongoose.model("Brand", brandSchema);