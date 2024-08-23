const {DataTypes} = require('sequelize');
const sequelize = require('./index').sequelize;

const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    hasWatermark: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'Media', // Ensure it's set to the correct table name
});

module.exports = Media;
