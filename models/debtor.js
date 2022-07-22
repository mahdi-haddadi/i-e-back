const mongoose = require("mongoose");

const deptorSchema = new mongoose.Schema(
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
    spurcePayment: {
      type: mongoose.Schema.Types.name,
      ref: "Source",
      required: [true, "Add This Field source payment"],
      default: null,
    },
    datePaid: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Deptor = mongoose.model("Deptor", deptorSchema);
module.exports = Deptor;
