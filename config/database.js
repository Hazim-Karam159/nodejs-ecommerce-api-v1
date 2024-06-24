const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((connect) => {
      console.log(connect.connection.host);
    })
    // .catch((err) => {
    //   console.error(err);
    //   process.exit(1);
    // });
}; 

module.exports = connectDB;
