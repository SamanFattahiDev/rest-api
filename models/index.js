const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.db',
    logging:true
});
// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to SQLite has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize instance
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;