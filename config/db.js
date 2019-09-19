const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(err);
    process.exit(1);
  }
};
