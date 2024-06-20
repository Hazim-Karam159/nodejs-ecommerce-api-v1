const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const Category = require("./models/categeorySchema");
const connectDB = require("./config/database");
const categoryRoute = require("./Routes/categoryRoute");


app.use(express.json());

connectDB();

app.use("/api/v1/categories", categoryRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
  console.log(`server is running on port ${PORT}`);
})
