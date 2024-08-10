const yup = require("yup");
const jwtSignInSchema = new yup.object({
    mobile: yup.string().required('وارد کردن شماره موبایل اجباری است'),
    password: yup.string().min(5, 'رمز عبور باید حداقل 5 کاراکتر باشد').required('وارد ککردن رمز عبور اجباری است'),
})

module.exports.jwtSignInSchema = jwtSignInSchema
