const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kodavatisudheer:9063840611%40@namasthenode.h8epfwc.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
