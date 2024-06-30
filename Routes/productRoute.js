

const Router = require("express").Router();
const productController = require("../Controllers/productController");
const productValidator = require("../utils/validator/productValidator");

Router.route('/')
  .get(productController.getAllProducts)
  .post( productValidator.addProductValidator, productController.addProduct);


  Router.route('/:productId')
  .get( productValidator.getProductValidator ,productController.getProduct)
  .patch( productValidator.updateProductValidator  ,productController.updateProduct)
  .delete( productValidator.deleteProductValidator ,productController.deleteProduct)

  module.exports = Router