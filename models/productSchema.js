const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Product Title'],
    minlength: [3, 'Too short Product Title'],
    maxlength: [100, 'Too long Product Title'],
  },
  slug :{
  type: String,
  lowercase: true,
  required: true,
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description'],
    minlength: [20, 'Too short Product Description'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please Enter Product Quantity'],
    
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product Price'],
    max: [2000000, 'Price can not exceed 2000000$'],
    trim: true,
  },
  priceAfterDiscount: {
    type: Number,
  },
  colors: [String],
  imageCover: {
    type: String,
    required: [true, 'Please Choose Product Image Cover'],
  },
  images: [String],
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be above or equal 1.0'],
    max: [5, 'Rating must be below or equal 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, "Product must belong to Category"],
  },
  subCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SubCategory',
      }
  ],
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand',
   
  },  
}
  , { timestamps: true });

  productSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select: 'name -_id',
    });
    next();
  });

module.exports = mongoose.model('Product', productSchema);