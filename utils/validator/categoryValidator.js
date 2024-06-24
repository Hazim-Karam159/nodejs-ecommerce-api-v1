const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const getCategoryValidator = [
  check("categoryId").isMongoId().withMessage("not valid category ID format"),

  validatorMiddleware,
];

const addCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required For Category")
    .isLength({ min: 2 })
    .withMessage("Too Short Category Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long Category Name"),
  validatorMiddleware,
];

const updateCategoryValidator = [
  check("categoryId").isMongoId().withMessage("not valid category ID format"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Too Short Updated Name For Category" )
    .isLength({ max: 32 })
    .withMessage("Too Long Updated Name For Category"),

  validatorMiddleware,
];

const deleteCategoryValidator = [
  check("categoryId").isMongoId().withMessage("not valid category ID format"),

  validatorMiddleware,
];

module.exports = {
  getCategoryValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
