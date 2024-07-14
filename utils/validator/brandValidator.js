const { check } = require("express-validator");
const  slugify  = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const getBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand ID format"),

  validatorMiddleware,
]

const addBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required For Brand")
    .isLength({ min: 2 })
    .withMessage("Too Short Brand Name ")
    .isLength({ max: 32 })
    .withMessage("Too Long Brand Name")
    .custom(async (name , {req} ) => {
      if (name) {
        req.body.slug = slugify(name);
      }
  return true;
    })
  ,
  validatorMiddleware,
]

const updateBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand ID format"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Too Short Updated Name For Brand" )
    .isLength({ max: 32 })
    .withMessage("Too Long Updated Name For Brand")
  .custom(async (name , {req} ) => {
    if (name) {
      req.body.slug = slugify(name);
    }
return true;
  })
  ,

  validatorMiddleware,
]

const deleteBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand ID format"),

  validatorMiddleware,
]

module.exports = {
  getBrandValidator,
  addBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
}