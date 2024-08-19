const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Brand Name"],
    unique: [true, "Brand Already Exist"],
    minlength: [2, "Too Short Brand Name"],
    maxlength: [32, "Too Long Brand Name"],
  },

  slug: {
    type: String,
    lowercase: true,
  },

  image: String,
}
  , { timestamps: true });

  const setImageURL = (doc) => {
    // set image base url + img name
    if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
      doc.image = imageUrl;
    }
  };
  
  
  // findOne, findAll, Update
  brandSchema.post("init", (doc) => {
    // set image base url + img name
    setImageURL(doc);
  });
  
  // add new one (create)
  brandSchema.post("save", (doc) => {
    setImageURL(doc);
  });
  



module.exports = mongoose.model("Brand", brandSchema);