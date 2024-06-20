const Category = require("../models/categeorySchema");
const slugify = require("slugify");

// @access : Public
const getAllCategories = async (req, res) => {
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
};

// @access : Public
const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category)
    res.status(404).json({ message: "Category not found", data: null });
  res.status(200).json({ data: { category } });
};

// @access : Private
const addCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json(newCategory);
};

// @access : Private
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const {name,slug} = req.body;
  const updatedCategory = await Category.findOneAndUpdate({_id: categoryId }, { name, slug: slugify(name)}, {
    new: true,
    select: '-__v' // Exclude the __v field
  }).select('-__v');
  if (!updatedCategory)
  {
    res.status(404).json({ message: "Category not found", data: null });
  }
  res.status(200).json(updatedCategory);
};

// @access : Private
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const deletedCategory = await Category.deleteOne({ _id: categoryId });
  
  if (!deletedCategory)
  {
    res.status(404).json({ message: "Category not found"});
  }
  res.status(204).send();
  
}


module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory, 
  deleteCategory
};
