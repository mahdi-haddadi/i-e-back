const mongoose = require("mongoose");

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
    },
    loanDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Creditor = mongoose.model("Creditor", creditorSchema);
module.exports = Creditor;
