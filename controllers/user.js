const express = require('express')
const {response} = require("express");
const router = express.Router();
const userService = require('../services/user')
const jwtService = require('../services/jwt')
const {userValidate, schemaValidator} = require("../middlewares/SchemaValidator");
const {userSchemaValidator} = require("../models/userModels");
const {userCreateSchemaValidator} = require("../validators/userValidators");
const {verifyJwt} = require("../middlewares/AuthorizationMiddleware");
// /**
//  * @swagger
//  * /Users/:
//  *   get:
//  *     summary:get all users
//  *     tags: Users
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Product ID
//  *     responses:
//  *       200:
//  *         description: A product object
//  *       404:
//  *         description: Product not found
//  */
router.get('/', verifyJwt,userService.getAllUser)
router.get('/:id', userService.getUser)
router.post('/Create',schemaValidator(userCreateSchemaValidator),userService.createUser)
router.put('/Update/:id', userService.updateUser)
router.delete('/Delete/:id', userService.deleteUser)


module.exports = router
