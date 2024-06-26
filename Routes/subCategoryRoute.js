const Router = require("express").Router();
const subCategoryController = require("../Controllers/subCategoryController");
const subCategoryValidator = require("../utils/validator/subCategoryValidator");


Router.route("/")
  .get(subCategoryController.getListOfSubCategories)
.post(subCategoryValidator.addSubCategoryValidator ,subCategoryController.addSubCategory)


Router.route("/:subCategoryId")
  .get( subCategoryValidator.getSubCategoryValidator,subCategoryController.getSubCategory)
  .patch(subCategoryValidator.updateSubCategoryValidator ,subCategoryController.updateSubCategory)
  .delete(subCategoryValidator.deleteSubCategoryValidator ,subCategoryController.deleteSubCategory);


module.exports = Router;