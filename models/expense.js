const mongoose = require("mongoose");
const { schema } = require("./secure/expenseValidation");
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Add This Field Title"],
      maxlength: [100, "The Title Is Long"],
    },
    description: {
      type: String,
      default: null,
    },
    source: {
      // type: mongoose.Schema.Types.name,
      // ref: "Source",
      type: String,
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
expenseSchema.statics.expenseValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
