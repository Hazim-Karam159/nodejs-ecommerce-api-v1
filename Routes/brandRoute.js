const Router = require("express").Router();
const brandController = require("../Controllers/brandController");
const brandValidator = require("../utils/validator/brandValidator");


Router.route("/")
  .get(brandController.getAllBrands)
  .post(brandValidator.addBrandValidator ,brandController.addBrand);  
;
  
Router.route("/:id")
  .get(brandValidator.getBrandValidator ,brandController.getBrand)
  .patch(brandValidator.updateBrandValidator ,brandController.updateBrand)
  .delete(brandValidator.deleteBrandValidator ,brandController.deleteBrand);


module.exports = Router;
