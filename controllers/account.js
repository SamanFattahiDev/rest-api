const express = require('express')
const {response} = require("express");
const router = express.Router();
const jwtService = require('../services/jwt')
const {userValidate} = require("../middlewares/SchemaValidator");
const {userSchemaValidator} = require("../models/userModels");
const {userCreateSchemaValidator} = require("../validators/userValidators");

router.post('/SignIn', jwtService.signJwtToken)

module.exports = router
