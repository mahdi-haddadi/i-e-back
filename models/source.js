const mongoose = require("mongoose");

const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add This Field name"],
  },
  description: {
    type: String,
    maxlength: [300, "The Description Is long"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});
const Source = mongoose.model("Source", sourceSchema);

module.exports = Source;
