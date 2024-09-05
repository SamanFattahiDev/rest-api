const {ServiceResult} = require("../utilities/ServiceResult");
const mediaService = require('../services/media')
const Product = require("../models/productModels");
// const getUser = async (req, res) => {
//     try {
//         res.json(new ServiceResult({
//             data: await User.findByPk(req.params.id)
//         }).ok())
//     } catch (error) {
//         res.json(new ServiceResult({
//             message: error
//         }).failure())
//     }
// }
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: {
                isDeleted: false
            }
        })
        return res.json(new ServiceResult({
            data: products
        }).ok())

    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
const createProduct = async (req, res) => {
    const filePath = await mediaService.uploadInGallery(req.file)
    const product = req.body
    try {
        await Product.create({
            ...product,
            file: filePath,
            isDeleted: false,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
        });
        return res.json(new ServiceResult({
            message: 'محصول با موفقیت ساخته شد',
        }).ok())
    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
// const updateUser = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const {firstName, lastName} = req.body;
//         const user = await User.findByPk(id);
//         if (!user) {
//             return res.json(new ServiceResult({
//                 statusCode: 400,
//                 message: 'کاربری یافت نشد'
//             }).failure())
//         }
//
//         user.firstName = firstName
//         user.lastName = lastName
//         await user.save();
//         res.json(new ServiceResult({
//             message: 'عملیات با موفقیت انجام شد'
//         }).ok());
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// }
// const deleteUser = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const user = await User.findByPk(id);
//         if (!user) {
//             return res.status(404).json({error: 'User not found'});
//         }
//
//         await user.destroy();
//         res.json({message: 'User deleted'});
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// }
module.exports = {
    createProduct,
    getAllProducts
}
