const yup = require("yup");

exports.schema = yup.object().shape({
  origin: yup.string().trim().required("مبدا واریز را وارد کنید"),
  total: yup.number().required("مبلغ واریز را وارد کنید"),
  dateOfDeposit: yup.date().required("تاریخ واریز را وارد کنید"),
  storage: yup.string().required("محل ذخیره واریز را وارد کنید"),
  title: yup
    .string()
    .max(100, "عنوان نباید بیشتر از 100 کاراکتر باشد")
    .required("عنوان واریز را وارد کنید"),
});
