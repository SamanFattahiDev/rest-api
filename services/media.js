const {ServiceResult} = require("../utilities/ServiceResult");
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const {generateRandomName} = require("../utilities/utilityFunctions");
const Media = require("../models/mediaModels");
const mimeInfos = {
    'image/': {
        type: 1,
        path: '/images'
    },
    'video/': {
        type: 2,
        path: '/videos'
    },
    'application/': {
        type: 3,
        path: '/files'
    },
}
let currentMediaType = null
const handleUploadedFile = async (req, res) => {
    if (req.file) {
        currentMediaType = getMediaType(req.file.mimetype).type
        if (currentMediaType === 1) {
            await convertToWebp(req.file)
        } else {
            await saveInDestination(req.file)
        }
        return res.json(new ServiceResult({
            message: 'File Saved'
        }).ok())
    } else {
        res.json(new ServiceResult({
            message: 'file not found'
        }).failure())
    }
}
const getAllMedia = async (req, res) => {
    try {
        res.json(new ServiceResult({
            data: await Media.findAll()
        }).ok())
    } catch (error) {
        res.json(new ServiceResult({
            message: error
        }).failure())
    }
}
const getMediaType = (mimeType) => {

    let mediaType = null;
    Object.keys(mimeInfos).forEach((key) => {
        if (mimeType.includes(key)) {
            mediaType = mimeInfos[key]
        }
    })
    return mediaType
}
const convertToWebp = async (file) => {
    const webpBuffer = await sharp(file.buffer)
        .resize(200)
        .toBuffer()
    file.buffer = webpBuffer
    const splitedName = file.originalname.split('.')
    file.originalname = `${splitedName[0]}.webp`
    saveInDestination(file)
}
const saveInDestination = async (file) => {
    const rootDir = path.join(__dirname, '../'); // Moving up one level to root
    const mediaDir = path.join(rootDir, `Media${getMediaType(file.mimetype).path}`);
    fs.mkdir(mediaDir, {recursive: true}, (err) => {
        if (err) {
            console.log(err)
        } else {
            saveFile(file, mediaDir)
        }
    })
}
const saveFile = async (file, mediaDir) => {
    // Generate a unique filename with extension
    const randomName = `${generateRandomName()}.${file.originalname.split('.')[1]}`;
    const filePath = path.join(mediaDir, randomName);
    // Save the file
    await fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
            console.log(err)
        } else {
            saveInModel(randomName)
        }
    });
};
const saveInModel = async (fileName) => {
    try {
        await Media.create({
            guid: fileName,
            type: currentMediaType,
            hasWatermark: false,
            isDeleted: false,
        });

    } catch (e) {
        console.log(e)
    }
}
module.exports = {
    handleUploadedFile,
    getAllMedia
}