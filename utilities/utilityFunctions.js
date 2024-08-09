const bcrypt = require('bcryptjs');
const saltRounds = 10

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


module.exports.generateSalt = generateSalt

