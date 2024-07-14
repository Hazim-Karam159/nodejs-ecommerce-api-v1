const { check } = require("express-validator");
const  slugify  = require("slugify");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categeorySchema");
const SubCategory = require("../../models/subCategorySchema");

const addProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product Title is required")
    .isLength({min:3})
    .withMessage("Too Short Product Title")
    .isLength({max:100})
    .withMessage("Too Long Product Title")
    .custom(async (name , {req} ) => {
      if (name) {
        req.body.slug = slugify(name);
      }
  return true;
    })
  ,
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
    .withMessage("Product must belong to a Category")
    .isMongoId()
    .withMessage("Invalid category ID format")
    .custom( async(categoryId) => {
      const category = await Category.findById(categoryId);
      if (!category) { 
        throw new Error(`Category not found for this ID:  ${categoryId}`);
      }
      return true;
    })
  ,
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("not valid subCategory ID format")
    .custom(async (subCategoriesId) => {
      const subCategory = await SubCategory.find({ _id: { $exists: true, $in: subCategoriesId } });
      if (subCategory.length <1 || subCategory.length !== subCategoriesId.length)
      {
        throw new Error("Invalid subCategory ID");     
        }
    })
    
    
    
    
  ,
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("not valid brand ID format"),
  validatorMiddleware,
];

const getProductValidator = [
  check("id").isMongoId().withMessage("not valid product ID format"),
  validatorMiddleware,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("not valid product ID format")
  ,
  check("title").optional().custom(async (name , {req} ) => {
    if (name) {
      req.body.slug = slugify(name);
    }
return true;
  })
  
  ,
  validatorMiddleware,
];

const deleteProductValidator = [
  check("id").isMongoId().withMessage("not valid product ID format"),
  validatorMiddleware,
];

module.exports = {
  addProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
