const yup = require("yup");

exports.schema = yup.object().shape({
  who: yup.string().required("بدهکار را وارد کنید"),
  amount: yup.number().required("مبلغ بدهکاری را وارد کنید"),
});
