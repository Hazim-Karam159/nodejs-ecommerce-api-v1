const SubCategory = require("../models/subCategorySchema");
const factory = require("./handlersFactory");

const getListOfSubCategories = factory.getAll(SubCategory);

const getSubCategory = factory.getOne(SubCategory);

const addSubCategory = factory.addOne(SubCategory);

const updateSubCategory = factory.updateOne(SubCategory);

const deleteSubCategory = factory.deleteOne(SubCategory);

module.exports = {
  getListOfSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
