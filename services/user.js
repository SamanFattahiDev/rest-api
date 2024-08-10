const {ServiceResult} = require("../utilities/ServiceResult");
const {generateSalt} = require("../utilities/utilityFunctions");
const User = require('../models/userModels');
const getUser = async (req, res) => {
    try {
        res.json(new ServiceResult({
            data: await User.findByPk(req.params.id)

        }).ok())
    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
const getAllUser = async (req, res) => {
    try {
        res.json(new ServiceResult({
            data: await User.findAll()

        }).ok())
    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
const createUser = async (req, res) => {
    console.log(req.body)
    try {
        const hashedPassword = await generateSalt(req.body.password);
        const user = req.body
        user.password = hashedPassword
        await User.create({
            ...user,
            createdAt:new Date(Date.now()),
            updatedAt:new Date(Date.now())
        });
        res.json(new ServiceResult({
            message: 'کاربر با موفقیت ایجاد شد'
        }).ok())
    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName} = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.json(new ServiceResult({
                statusCode: 400,
                message: 'کاربری یافت نشد'
            }).failure())
        }

        user.firstName = firstName
        user.lastName = lastName
        await user.save();
        res.json(new ServiceResult({
            message: 'عملیات با موفقیت انجام شد'
        }).ok());
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    getUser, getAllUser, deleteUser, createUser, updateUser
}
