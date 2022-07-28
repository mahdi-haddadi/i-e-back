const mongoose = require("mongoose");
const { schema } = require("./secure/creditorValidation");

const creditorSchema = new mongoose.Schema(
  {
    who: {
      type: String,
      required: [true, "Add This Field who"],
    },
    amount: {
      type: Number,
      required: [true, "Add This Field amount"],
    },
    description: {
      type: String,
      default:null
    },
    loanDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
creditorSchema.statics.creditorValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
const Creditor = mongoose.model("Creditor", creditorSchema);
module.exports = Creditor;
