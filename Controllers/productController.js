const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productSchema");
const AppError = require("../utils/AppError");


const getAllProducts = asyncHandler(async (req, res, next) => { 
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);
  const products = await Product.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res
    .status(200)
    .json({ results: products.length, page, data: { products } });
})

const getProduct = asyncHandler(async (req, res, next) => { 
  const { productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
  return next(new AppError(`Product not found for this id ${productId}`, 404));
  }
  res.status(200).json({ data: { product } });
})

const addProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
})
const updateProduct = asyncHandler(async (req, res, next) => { 
  const { productId } = req.params;
  req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findOneAndUpdate({
    _id: productId},
    req.body,
   { new: true,}
  )
  if (!updatedProduct)
      return next(new AppError(`Product not found for this id ${productId}`,
      404
    ));
  res.status(200).json(updatedProduct);
})

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const deletedProduct = await Product.deleteOne({ _id: productId });
  if (deletedProduct.deletedCount === 0) {
    return next(new AppError(
      `Product not found for this id ${productId}`,
      404
    ));
  }
  res.status(204).send();
})

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}