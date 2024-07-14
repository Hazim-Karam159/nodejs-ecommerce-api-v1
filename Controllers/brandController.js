const Brand = require("../models/brandSchema");
const factory = require("./handlersFactory");

const getAllBrands = factory.getAll(Brand);

const getBrand = factory.getOne(Brand);

const addBrand = factory.addOne(Brand);

const updateBrand = factory.updateOne(Brand);

const deleteBrand = factory.deleteOne(Brand);

module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
