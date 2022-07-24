const yup = require("yup");
exports.schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(100, "عنوان نباید بیشتر از 100 کاراکتر باشد")
    .required("عنوان واریز را وارد کنید"),
  source: yup.string().required("محل برداشت هزینه را وارد کنید"),
  cost: yup.number().required("مبلغ برداشت را وارد کنید"),
  expenditureDate: yup.date().required("تاریخ برداشت را وارد کنید"),
});
