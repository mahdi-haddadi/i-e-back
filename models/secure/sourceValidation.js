const yup = require("yup");

exports.schema = yup.object().shape({
  name: yup.string().trim().required("نام مخزن را وارد کنید"),
  description: yup.string(),
  stock: yup.number(),
});
