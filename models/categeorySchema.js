const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Category Name"],
      unique: [true, "Category Already Exist"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [32, "Name should not exceed 32 characters"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  // set image base url + img name
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
  }
};


// findOne, findAll, Update
categorySchema.post("init", (doc) => {
  // set image base url + img name
  setImageURL(doc);
});

// add new one (create)
categorySchema.post("save", (doc) => {
  setImageURL(doc);
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
