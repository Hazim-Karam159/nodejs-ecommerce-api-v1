const express = require("express");

const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/database");
const categoryRoute = require("./Routes/categoryRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middlewares/errorHandlerMiddleware");
const unhandledRejection = require("./middlewares/unhandledRejectionMiddlewares");

app.use(express.json());

connectDB();

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find this route ${req.originalUrl} on the server`,
    400
  );
  next(error);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

process.on("unhandledRejection", unhandledRejection);
