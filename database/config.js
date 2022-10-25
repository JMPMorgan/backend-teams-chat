const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useUnifiedTopology: true,
    });
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
    throw new Error("Fatal Error: Connection to DB ");
  }
};

module.exports = {
  dbConnection,
};
