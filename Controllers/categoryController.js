const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const Category = require("../models/categeorySchema");
const factory = require("./handlersFactory");
const uploadSingleStorage = require("../middlewares/uploadImageMiddleware");

// multer diskStorage
/* 
const multerStorage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, "uploads/categories");
  },
  filename: function (req, file, cb) { 
    const ext = file.mimetype.split("/")[1];
    const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    cb(null, filename);
  }

}) 
  */

// multer memoryStorage (we use memSto here to store file as a buffer)

const uploadCategoryImage = uploadSingleStorage("image");

const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  // sharp is promise
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 98 })
    .toFile(`uploads/categories/${filename}`);

  // save image into our DB

  req.body.image = filename;

  next();
});

// @access : Public
const getAllCategories = factory.getAll(Category);

// @access : Public
const getCategory = factory.getOne(Category);

// @access : Private
const addCategory = factory.addOne(Category);

const updateCategory = factory.updateOne(Category);

// @access : Private
const deleteCategory = factory.deleteOne(Category);

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
};
