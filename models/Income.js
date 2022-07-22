const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: [true, "Add This Field Origin"],
    },
    total: {
      type: Number,
      required: [true, "Add This Field Total"],
    },
    dateOfDeposit: {
      type: Date,
      required: [true, "Add This Field Date Of Deposit"],
    },
    storage: {
      type: mongoose.Schema.Types.name,
      ref: "Source",
      required: [true, "Add This Field Storage"],
    },
    title: {
      type: String,
      required: [true, "Add This Field Title"],
      maxlength: [100, "The Title Is Long"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;
