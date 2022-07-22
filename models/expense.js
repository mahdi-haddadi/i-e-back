const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Add This Field Title"],
      maxlength: [100, "The Title Is Long"],
    },
    description: {
      type: String,
    },
    source: {
      type: mongoose.Schema.Types.name,
      ref: "Source",
      required: [true, "Add This Field source"],
    },
    cost: {
      type: Number,
      required: [true, "Add This Field cost"],
    },
    expenditureDate: {
      type: Date,
      required: [true, "Add This Field Expenditure Date"],
    },
  },
  {
    timestamps: true,
  }
);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
