const { DataTypes } = require('sequelize');
const { db } = require('../db/config')

const ImcClasification = db.define('ImcClasification', {
    idImc: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_imc',
        validate: {isNumeric:true}
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'value'
    }
}, {
    tableName: 'imc_clasification',
    createdAt: false,
    updatedAt:false
});

module.exports = ImcClasification;