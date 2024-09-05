const {DataTypes} = require('sequelize');
const sequelize = require('./index').sequelize;

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true
    },

}, {
    tableName: 'Product', // Ensure it's set to the correct table name
});

module.exports = Product;
