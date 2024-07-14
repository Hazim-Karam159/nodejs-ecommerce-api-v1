const Product = require("../models/productSchema");
const factory = require("./handlersFactory");

const getAllProducts = factory.getAll(Product, "product");

const getProduct = factory.getOne(Product);

const addProduct = factory.addOne(Product);

//   req.body.slug = slugify(req.body.title);
//   const newProduct = await Product.create(req.body);
//   res.status(201).json(newProduct);
// });

const updateProduct = factory.updateOne(Product);

const deleteProduct = factory.deleteOne(Product);

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
