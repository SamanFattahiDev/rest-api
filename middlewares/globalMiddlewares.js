const db = require('../models/index');
const closeSQLConnection = (req, res, next) => {
    res.on('finish', () => {
        db.sequelize.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
        });
    });
    next();
}

module.exports.closeSQLConnection=closeSQLConnection
