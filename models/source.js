const mongoose = require("mongoose");
const { schema } = require("./secure/sourceValidation");

const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add This Field name"],
  },
  description: {
    type: String,
    maxlength: [300, "The Description Is long"],
    default:null
  },
  stock: {
    type: Number,
    default: 0,
  },
});

sourceSchema.statics.sourceValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
const Source = mongoose.model("Source", sourceSchema);

module.exports = Source;
