require("dotenv").config();
const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  mongoose.connect(process.env.MONGOURL);

  return mongoose.connection;
};
