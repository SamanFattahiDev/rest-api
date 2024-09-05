const bcrypt = require('bcryptjs');
const saltRounds = 10
const jwt = require('jsonwebtoken')
const sharp = require("sharp");
const path = require("path");

async function generateSalt(userPassword) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(userPassword, salt);
        return hashed; // Ensure the hashed password is returned here
    } catch (err) {
        console.error('Error when generating salt or hashing password:', err);
        throw err; // Rethrow the error so the calling function can handle it
    }
}

async function generateToken(payload) {
    const secretKey = process.env.JWT_SECRET; // Replace with your own secret key
    const options = {
        expiresIn: '1h', // Token expiration time
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

function generateRandomName() {
    return new Date().getTime().toString()
}

async function convertFileToWebp(file) {
    const webpBuffer = await sharp(file.buffer)
        .resize(200)
        .toBuffer()
    file.buffer = webpBuffer
    const splitedName = file.originalname.split('.')
    file.originalname = `${splitedName[0]}.webp`

    return file
}

function getCurrentDir() {
    return path.join(__dirname);

}

function getRootDir() {
    return path.join(__dirname, '../'); // Moving up one level to root

}

module.exports = {
    generateSalt,
    generateToken,
    generateRandomName,
    convertFileToWebp,
    getRootDir,
    getCurrentDir
}
