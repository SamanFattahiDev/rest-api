const {ServiceResult} = require("../utilities/ServiceResult");
const User = require("../models/userModels");
const bcrypt = require('bcryptjs')
const {generateToken} = require("../utilities/utilityFunctions");
const signJwtToken = async (req, res) => {
    const mobile = req.body.mobile
    const password = req.body.password
    const userDB = await User.findOne({where: {mobile: mobile}})
    if (userDB) {
        const match = await bcrypt.compare(password, userDB.password);
        if(match){
            const token = await generateToken({
                id: userDB.id,
                firstName: userDB.firstName,
                lastName: userDB.lastName,
                mobile: userDB.mobile,
            });
            console.log(token)
            res.json(new ServiceResult({
                data: token
            }).ok())
        }
        else {
            res.json(new ServiceResult({
                message: 'رمز عبور یا شماره موبایل صحیح نیست'
            }).failure())
        }
    }
    else {
        res.json(new ServiceResult({
            message: 'کاربری یافت نشد'
        }).failure())
    }
    // Check if username and password match
//     if (username === user.username && password === user.password) {
//         // Generate JWT token
//         const token = generateToken(user);
//
//         res.json({
//             success: true,
//             message: 'Authentication successful!',
//             token: token,
//         });
//     } else {
//         res.status(401).json({
//             success: false,
//             message: 'Invalid username or password',
//         });
//     }
}

module.exports = {
    signJwtToken
}
