const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

const ApiFeatures = require("../utils/apiFeatures");

const getAll = (Model , modelName ='') =>asyncHandler(async (req, res, next) => {
  const documentsCount = await Model.countDocuments();

  const apiFeatures = new ApiFeatures(Model.find(), req.query).filter().limitFields().sort().search(modelName).paginate(documentsCount);

   // execute query
   const {mongooseQuery, paginationResult} = apiFeatures
   const documents = await mongooseQuery;

  res.status(200).json({ results: documents.length, paginationResult, data: { documents } });
}); 

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new AppError(`document not found for this id ${id}`, 404));
    }
    res.status(200).json({ data: { document } });
  });

const addOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json(newDocument);
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      select: "-__v", // Exclude the __v field
    }).select("-__v");
    if (!document)
      return next(new AppError(`${document} not found for this id ${id}`, 404));
    res.status(200).json(document);
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });


module.exports = {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  addOne,
};
