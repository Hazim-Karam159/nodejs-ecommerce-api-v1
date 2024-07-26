const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const Brand = require("../models/brandSchema");
const factory = require("./handlersFactory");
const uploadSingleStorage = require("../middlewares/uploadImageMiddleware");


const uploadBrandImage = uploadSingleStorage("image");

const resizeImage = asyncHandler(async (req, res, next) => {

  const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer).resize(600, 600).toFormat("jpeg").jpeg({ quality: 98 }).toFile(`uploads/brands/${fileName}`);

// save image into our DB

req.body.image = fileName;

  next();

})


const getAllBrands = factory.getAll(Brand);

const getBrand = factory.getOne(Brand);

const addBrand = factory.addOne(Brand);

const updateBrand = factory.updateOne(Brand);

const deleteBrand = factory.deleteOne(Brand);

module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage
};
