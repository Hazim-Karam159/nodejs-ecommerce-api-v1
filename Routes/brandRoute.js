const Router = require("express").Router();
const brandController = require("../Controllers/brandController");
const brandValidator = require("../utils/validator/brandValidator");
const uploadBrandImage = require("../middlewares/uploadImageMiddleware");

Router.route("/")
  .get(brandController.getAllBrands)
  .post(
    brandController.uploadBrandImage,
    brandController.resizeImage,
    brandValidator.addBrandValidator,
    brandController.addBrand
  );
Router.route("/:id")
  .get(brandValidator.getBrandValidator, brandController.getBrand)
  .patch(
    brandController.uploadBrandImage,
    brandController.resizeImage,
    brandValidator.updateBrandValidator,
    brandController.updateBrand
  )
  .delete(brandValidator.deleteBrandValidator, brandController.deleteBrand);

module.exports = Router;
