const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


const getSubCategoryValidator = [
  check("subCategoryId")
    .isMongoId()
    .withMessage("not valid SubCategory ID format"),
  validatorMiddleware,
];

const addSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required For SubCategory")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name"),

  check("category")
    .notEmpty()
    .withMessage("Name is required For SubCategory")
    .isMongoId()
    .withMessage("not valid SubCategory ID format"),
  validatorMiddleware,
];

const updateSubCategoryValidator = [

  check("subCategoryId")
    .isMongoId()
    .withMessage("not valid SubCategory ID format"),
  
  check("name")
    .notEmpty()
    .withMessage("Name is required For SubCategory")
    .isLength({ min: 2 })
    .withMessage("Too Short SubCategory Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long SubCategory Name"),

  check("category")
    .isMongoId()
    .withMessage("not valid SubCategory ID format"),
  
    validatorMiddleware,
]

const deleteSubCategoryValidator = [
  check("subCategoryId")
    .isMongoId()
    .withMessage("not valid SubCategory ID format"),
  validatorMiddleware,
];
module.exports = {
  getSubCategoryValidator,
  addSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,

};
