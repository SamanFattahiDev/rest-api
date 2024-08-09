const yup = require("yup");
const userSchemaValidator = new yup.object({
    firstName: yup.string().required('وارد کردن نام اجباری است'),
    lastName: yup.string().required('وارد کردن نام خانوادگی اجباری است'),
    password: yup.string().min(5, 'رمز عبور باید حداقل 5 کاراکتر باشد').required('وارد ککردن رمز عبور اجباری است'),
    mobile: yup.string().required('وارد کردن شماره موبایل اجباری است'),
})

module.exports.userCreateSchemaValidator = userSchemaValidator