const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productSchema");
const AppError = require("../utils/AppError");

const getAllProducts = asyncHandler( async (req, res, next) => {

// filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields","keyword"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // filter with <= >= < >
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // Paginatoin
    const { page = 1, limit = 10 } = req.query;
    const skip = limit * (page - 1);

  //  build query

  let mongooseQuery = Product.find(JSON.parse(queryStr))
  .limit(limit)
  .skip(skip)
  .populate({ path: "category", select: "name -_id" });


  // sorting
  if(req.query.sort)
  {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery =  mongooseQuery.sort(sortBy);
  }else
  {
    mongooseQuery =  mongooseQuery.sort("-createdAt");
  }

  // Fields Limiting

  if (req.query.fields)
  {
    const fields = req.query.fields.split(',').join(' ');
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select('-__v');
  }
 

  // Searching

  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }



  // execute query
  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: { products } });
});



const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(
      new AppError(`Product not found for this id ${productId}`, 404)
    );
  }
  res.status(200).json({ data: { product } });
});

const addProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);
});
const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: productId,
    },
    req.body,
    { new: true }
  );
  if (!updatedProduct)
    return next(
      new AppError(`Product not found for this id ${productId}`, 404)
    );
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const deletedProduct = await Product.deleteOne({ _id: productId });
  if (deletedProduct.deletedCount === 0) {
    return next(
      new AppError(`Product not found for this id ${productId}`, 404)
    );
  }
  res.status(204).send();
});

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
