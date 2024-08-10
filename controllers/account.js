const express = require('express')
const {response} = require("express");
const router = express.Router();
const jwtService = require('../services/jwt')
const {userValidate, schemaValidator} = require("../middlewares/SchemaValidator");
const {userSchemaValidator} = require("../models/userModels");
const {userCreateSchemaValidator} = require("../validators/userValidators");
const {jwtSignInSchema} = require("../validators/jwtValidators");

router.post('/SignIn', schemaValidator(jwtSignInSchema),jwtService.signJwtToken)

module.exports = router
