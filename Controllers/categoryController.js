const Category = require("../models/categeorySchema");
const factory = require("./handlersFactory");

// @access : Public
const getAllCategories = factory.getAll(Category);

// @access : Public
const getCategory = factory.getOne(Category);

// @access : Private
const addCategory = factory.addOne(Category);

const updateCategory = factory.updateOne(Category);

// @access : Private
const deleteCategory = factory.deleteOne(Category);

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
