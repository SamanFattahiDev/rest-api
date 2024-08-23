const express = require('express')
const router = express.Router();
const mediaService = require('../services/media')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
router.post('/UploadFile', upload.single('file'), mediaService.handleUploadedFile)
router.get('/', mediaService.getAllMedia)
// router.post('/UploadBase64', jwtService.signJwtToken)
// router.post('/DeleteByMediaId', jwtService.signJwtToken)

module.exports = router

