const Category = require("../models/categeorySchema");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

// @access : Public
const getAllCategories = asyncHandler(async (req, res) => {
  const query = req.query;
  const page = query.page;
  const limit = query.limit;
  const skip = limit * (page - 1);
  const categories = await Category.find({}, { __v: false })
    .limit(limit)
    .skip(skip);
  res
    .status(200)
    .json({ results: categories.length, page, data: { categories } });
});

// @access : Public
const getCategory = asyncHandler( async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category)
  {
    const notFoundCategory = new AppError(`Category not found for this id ${categoryId}`, 404);
    return next(notFoundCategory);  
  }
  res.status(200).json({ data: { category } });
});

// @access : Private
const addCategory = asyncHandler( async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json(newCategory);
});

// @access : Private
const updateCategory = asyncHandler (async (req, res) => {
  const { categoryId } = req.params;
  const {name,slug} = req.body;
  const updatedCategory = await Category.findOneAndUpdate({_id: categoryId }, { name, slug: slugify(name)}, {
    new: true,
    select: '-__v' // Exclude the __v field
  }).select('-__v');
  if (!updatedCategory)
  {
    const notFoundCategory = new AppError(`Category not found for this id ${categoryId}`, 404);
    return next(notFoundCategory);  
  }
  res.status(200).json(updatedCategory);
});

// @access : Private
const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const deletedCategory = await Category.deleteOne({ _id: categoryId });
  
  if (!deletedCategory) {
    const notFoundCategory = new AppError(`Category not found for this id ${categoryId}`, 404);
    return next(notFoundCategory);
  }
  res.status(204).send();
  
});


module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory, 
  deleteCategory
};
