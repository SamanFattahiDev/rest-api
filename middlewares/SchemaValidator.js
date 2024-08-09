const {ServiceResult} = require("../utilities/ServiceResult");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (err) {
        console.log(err.errors)
        res.json(new ServiceResult({
            message: err.errors.join(' | '),
            statusCode: 400
        }).failure())
        // More logic goes here
    }
};

module.exports.userValidate = validate