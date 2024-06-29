const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Brand = require("../models/brandSchema");
const AppError = require("../utils/AppError");


const getAllBrands = asyncHandler(async (req, res, next) => { 
  const { page = 1, limit = 10 } = req.query;
  const skip = limit * (page - 1);
  const brands = await Brand.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({ results: brands.length, page, data: { brands } });
})

const getBrand = asyncHandler(async (req, res, next) => {
  const { brandId } = req.params;
  const brand = await Brand.findById(brandId);
  if (!brand) {
  return next(new AppError(`Brand not found for this id ${brandId}`, 404));
  }
  res.status(200).json({ data: { brand } });
})

const addBrand = asyncHandler(async (req, res, next) => { 
  const { name } = req.body;
  const newBrand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json(newBrand);
})

const updateBrand = asyncHandler(async (req, res, next) => { 
  const { brandId } = req.params;
  const { name, slug } = req.body;
  const updatedBrand = await Brand.findOneAndUpdate(
    { _id: brandId },
    { name, slug: slugify(name) },
    {
      new: true,
      select: "-__v", // Exclude the __v field
    }
  ).select("-__v");
  if (!updatedBrand)
      return next(new AppError(`Category not found for this id ${brandId}`,
      404
    ));
  res.status(200).json(updatedBrand);
});

const deleteBrand = asyncHandler(async (req, res, next) => { 
  const { brandId } = req.params;
  const deletedBrand = await Brand.deleteOne({ _id: brandId });
  if (deletedBrand.deletedCount === 0) {
    return next(new AppError(
      `Category not found for this id ${brandId}`,
      404
    ));
  }
  res.status(204).send();
})


module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand
}