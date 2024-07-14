const { check } = require("express-validator");
const  slugify  = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const getCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category ID format"),

  validatorMiddleware,
];

const addCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required For Category")
    .isLength({ min: 2 })
    .withMessage("Too Short Category Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long Category Name")
    .custom(async (name , {req} ) => {
      if (name) {
        req.body.slug = slugify(name);
      }
  return true;
    })
  ,
  validatorMiddleware,
];

const updateCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category ID format"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Too Short Updated Name For Category" )
    .isLength({ max: 32 })
    .withMessage("Too Long Updated Name For Category")
    .custom(async (name , {req} ) => {
      if (name) {
        req.body.slug = slugify(name);
      }
  return true;
    })
    ,
  

  validatorMiddleware,
];

const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category ID format"),

  validatorMiddleware,
];

module.exports = {
  getCategoryValidator,
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
