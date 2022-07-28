const yup = require("yup");

exports.schema = yup.object().shape({
  who: yup.string().required("بستانکار را وارد کنید"),
  amount: yup.number().required("مبلغ بستانکاری را وارد کنید"),
});
