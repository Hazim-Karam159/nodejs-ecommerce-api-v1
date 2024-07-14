const Router = require("express").Router();
const categoryController = require("../Controllers/categoryController");
const categoryValidator = require("../utils/validator/categoryValidator");
const subCategoryRoute = require("./subCategoryRoute");


Router.use("/:categoryId/subCategories", subCategoryRoute);

Router.route("/")
  .get(categoryController.getAllCategories)
  .post(categoryValidator.addCategoryValidator ,categoryController.addCategory);

// categoryId lazm tkon nfs el name elle hnak f el {categoryId} = req.params
Router.route("/:id")
  .get(categoryValidator.getCategoryValidator  ,categoryController.getCategory)
  .patch(categoryValidator.updateCategoryValidator ,categoryController.updateCategory)
  .delete(categoryValidator.deleteCategoryValidator  ,categoryController.deleteCategory);

module.exports = Router;
