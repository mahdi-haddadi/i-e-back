const mongoose = require("mongoose");

module.exports = connectDB = async () => {
  await mongoose
    .connect(`mongodb://127.0.0.1:27017/income-expenses`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect to database");
    })
    .catch((err) => {
      console.log(`error to connect datebase => ${err}`);
    });
};
