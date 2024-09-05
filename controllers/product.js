const express = require('express')
const router = express.Router();
const productService = require('../services/product')
const multer = require('multer')
const {schemaValidator} = require("../middlewares/SchemaValidator");
const {productSchemaValidator} = require("../validators/productValidators");
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
router.post('/Create',upload.single('image'),schemaValidator(productSchemaValidator), productService.createProduct)
// router.get('/GetById/:id', mediaService.getAllMedia)
router.get('/GetAll', productService.getAllProducts)
// router.put('/Update', jwtService.signJwtToken)
// router.delete('/Delete/:id', jwtService.signJwtToken)

module.exports = router

