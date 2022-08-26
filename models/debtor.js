const mongoose = require("mongoose");
const { schema } = require("./secure/debtorValidation");
const debtorSchema = new mongoose.Schema(
  {
    who: {
      type: String,
      required: [true, "Add This Field who"],
    },
    amount: {
      type: Number,
      required: [true, "Add This Field amount"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    sourcePayment: {
      // type: mongoose.Schema.Types.name,
      // ref: "Source",
      type: String,
      // required: [true, "Add This Field source payment"],
      default: null,
    },
    datePaid: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: null,
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
debtorSchema.statics.debtorValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
const Debtor = mongoose.model("Debtor", debtorSchema);
module.exports = Debtor;
