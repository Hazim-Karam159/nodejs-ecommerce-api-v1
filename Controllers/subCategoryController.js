const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/subCategorySchema");
const AppError = require("../utils/AppError");

const getListOfSubCategories = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);

  let filterObj = {};
  if (req.params.categoryId)
    filterObj = { category: req.params.categoryId };


  const subCategories = await SubCategory.find(filterObj, { __v: false })
.limit(limit)
    .skip(skip)
    .populate({path: "category", select: "name -_id"});

  res
    .status(200)
    .json({ results: subCategories.length, page, data: { subCategories } });
});

const getSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;

  const subCategory = await SubCategory.findById(subCategoryId).populate({path: "category", select: "name -_id"});

  if (!subCategory) {
    
    return next(new AppError(
      `SubCategory not found for this id ${subCategoryId}`,
      404
    ));
  }

  res.status(200).json({ data: { subCategory } });
});

const addSubCategory = asyncHandler( async (req, res, next) => {
  const { name, category } = req.body;
  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category
  });
 
  res.status(201).json(newSubCategory);
});

const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const { name, category } = req.body;

  const updatedSubCategory = await SubCategory.findOneAndUpdate(
    { _id: subCategoryId },
    { name, slug: slugify(name), category },
    {
      new: true,
      select: "-__v", // Exclude the __v field
    }
  )
    // .select("-__v");

  if (!updatedSubCategory) {
    return next(new AppError(
      `SubCategory not found for this id ${subCategoryId}`,
      404
    ));
  }
  res.status(200).json({ data: { updatedSubCategory } });
});

const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { subCategoryId } = req.params;
  const deletedSubCategory = await SubCategory.deleteOne({
    _id: subCategoryId,
  });
  if (deletedSubCategory.deletedCount === 0) {
    return next(new AppError(
      `SubCategory not found for this id ${subCategoryId}`,
      404
    ));
  }
  res.status(204).send();
});

module.exports = {
  getListOfSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
