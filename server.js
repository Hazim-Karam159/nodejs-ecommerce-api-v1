const path = require("path");

const express = require("express");

const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/database");
const categoryRoute = require("./Routes/categoryRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");
const brandRoute = require("./Routes/brandRoute");
const productRoute = require("./Routes/productRoute");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middlewares/errorHandlerMiddleware");
const unhandledRejection = require("./middlewares/unhandledRejectionMiddlewares");

connectDB();

app.use(express.json());

// Serving a file means making a file available over the web so that it can be accessed and viewed by users through their web browsers. When you "serve" a file, you're essentially allowing users to request that file from your server, and the server responds by sending that file to them.
app.use(express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

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
