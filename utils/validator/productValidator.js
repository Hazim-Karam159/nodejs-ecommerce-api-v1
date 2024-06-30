const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const addProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product Title is required")
    .isLength({min:3})
    .withMessage("Too Short Product Title")
    .isLength({max:32})
    .withMessage("Too Long Product Title"),
  check("description")
    .notEmpty()
    .withMessage("Product Description is required")
    .isLength({min:32})
    .withMessage("Too Short Product Description"),
  check("quantity")
    .notEmpty()
    .withMessage("Product Quantity is required")
    .isNumeric()
    .withMessage("Product Quantity Must Be Number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product Sold Must Be Number"),
  check("price")
    .notEmpty()
    .withMessage("Product Price is required")
    .isNumeric()
    .withMessage("Product Price Must Be Number")
    .isLength({ max: 32 })
    .withMessage("Too Long Product Price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product Price After Discount Must Be a Number")
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price)
        throw new Error("priceAfterDiscount must be lower than price");
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product Colors Must Be Array Of String"),
  check("imageCover").notEmpty().withMessage("Product Image Cover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product Images Must Be Array Of images"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product Ratings Average Must Be Number")
    .isLength({ min: 1 })
    .withMessage("rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product Ratings Quantity Must Be Number"),
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product Rating Quantity Must Be a Number"),

  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a Category")
    .isMongoId()
    .withMessage("not valid category ID format"),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("not valid subCategory ID format"),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("not valid brand ID format"),
  validatorMiddleware,
];

const getProductValidator = [
  check("productId").isMongoId().withMessage("not valid product ID format"),
  validatorMiddleware,
];

const updateProductValidator = [
  check("productId").isMongoId().withMessage("not valid product ID format"),
  validatorMiddleware,
];

const deleteProductValidator = [
  check("productId").isMongoId().withMessage("not valid product ID format"),
  validatorMiddleware,
];

module.exports = {
  addProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
