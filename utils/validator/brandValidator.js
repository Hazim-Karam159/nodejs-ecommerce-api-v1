const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const getBrandValidator = [
  check("brandId").isMongoId().withMessage("not valid brand ID format"),

  validatorMiddleware,
]

const addBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required For Brand")
    .isLength({ min: 2 })
    .withMessage("Too Short Brand Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long Brand Name"),
  validatorMiddleware,
]

const updateBrandValidator = [
  check("brandId").isMongoId().withMessage("not valid brand ID format"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Too Short Updated Name For Brand" )
    .isLength({ max: 32 })
    .withMessage("Too Long Updated Name For Brand"),

  validatorMiddleware,
]

const deleteBrandValidator = [
  check("brandId").isMongoId().withMessage("not valid brand ID format"),

  validatorMiddleware,
]

module.exports = {
  getBrandValidator,
  addBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
}