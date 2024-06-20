const Router = require("express").Router();
const categoryController = require("../Controllers/categoryController");

Router.route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.addCategory);

// categoryId lazm tkon nfs el name elle hnak f el {categoryId} = req.params
Router.route("/:categoryId")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = Router;
