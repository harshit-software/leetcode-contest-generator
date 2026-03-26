const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
