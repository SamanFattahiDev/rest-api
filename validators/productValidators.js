const yup = require("yup");
const productSchemaValidator = new yup.object({
    title: yup.string().required('وارد کردن نام اجباری است'),
    price: yup.string().required('وارد کردن قیمت  اجباری است'),
    image: yup.object().nullable(),
})

module.exports.productSchemaValidator = productSchemaValidator