const Router = require("express").Router();
const categoryController = require("../Controllers/categoryController");
const categoryValidator = require("../utils/validator/categoryValidator");
const subCategoryRoute = require("./subCategoryRoute");
const uploadCategoryImage = require("../middlewares/uploadImageMiddleware");

Router.use("/:categoryId/subCategories", subCategoryRoute);

Router.route("/")
  .get(categoryController.getAllCategories)
  .post(
    categoryController.uploadCategoryImage,
    categoryController.resizeImage,
    categoryValidator.addCategoryValidator,
    categoryController.addCategory
  );

// categoryId lazm tkon nfs el name elle hnak f el {categoryId} = req.params
Router.route("/:id")
  .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
  .patch(
    categoryController.uploadCategoryImage,
    categoryController.resizeImage,
    categoryValidator.updateCategoryValidator,
    categoryController.updateCategory
  )
  .delete(
    categoryValidator.deleteCategoryValidator,
    categoryController.deleteCategory
  );

module.exports = Router;
